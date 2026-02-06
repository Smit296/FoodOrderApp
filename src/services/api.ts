// Supabase API service - replaces mock API
import { CartItem, CustomerInfo, Order, OrderStatus, MenuItem } from '@/types';
import { supabase } from '@/lib/supabase';

export const api = {
  // Get menu items from Supabase
  getMenu: async (): Promise<{ items: MenuItem[] }> => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('category', { ascending: true });

    if (error) {
      console.error('Error fetching menu items:', error);
      throw new Error('Failed to fetch menu items');
    }

    return { items: data || [] };
  },

  // Create a new order in Supabase
  createOrder: async (items: CartItem[], customerInfo: CustomerInfo): Promise<{ order: Order }> => {
    // Calculate total
    const { data: menuItems } = await supabase
      .from('menu_items')
      .select('*')
      .in('id', items.map(item => item.menuItemId));

    const total = items.reduce((sum, cartItem) => {
      const menuItem = menuItems?.find(m => m.id === cartItem.menuItemId);
      return sum + (menuItem?.price || 0) * cartItem.quantity;
    }, 0);

    // Create order ID
    const orderId = `ORD-${Date.now()}`;

    // Insert order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        customer_address: customerInfo.address,
        status: OrderStatus.RECEIVED,
        total
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      throw new Error('Failed to create order');
    }

    // Insert order items
    const orderItems = items.map(item => ({
      order_id: orderId,
      menu_item_id: item.menuItemId,
      quantity: item.quantity
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      throw new Error('Failed to create order items');
    }

    // Convert database format to frontend Order type
    const order: Order = {
      id: orderData.id,
      items,
      customerInfo: {
        name: orderData.customer_name,
        phone: orderData.customer_phone,
        address: orderData.customer_address
      },
      status: orderData.status as OrderStatus,
      total: orderData.total,
      createdAt: new Date(orderData.created_at),
      updatedAt: new Date(orderData.updated_at)
    };

    return { order };
  },

  // Get order by ID from Supabase
  getOrder: async (id: string): Promise<{ order: Order | null }> => {
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (orderError || !orderData) {
      console.error('Error fetching order:', orderError);
      return { order: null };
    }

    // Get order items
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select('menu_item_id, quantity')
      .eq('order_id', id);

    if (itemsError) {
      console.error('Error fetching order items:', itemsError);
      return { order: null };
    }

    // Convert to CartItem format
    const items: CartItem[] = orderItems.map(item => ({
      menuItemId: item.menu_item_id,
      quantity: item.quantity
    }));

    // Convert database format to frontend Order type
    const order: Order = {
      id: orderData.id,
      items,
      customerInfo: {
        name: orderData.customer_name,
        phone: orderData.customer_phone,
        address: orderData.customer_address
      },
      status: orderData.status as OrderStatus,
      total: orderData.total,
      createdAt: new Date(orderData.created_at),
      updatedAt: new Date(orderData.updated_at)
    };

    return { order };
  },

  // Get order status from Supabase
  getOrderStatus: async (id: string): Promise<{ status: OrderStatus | null }> => {
    const { data, error } = await supabase
      .from('orders')
      .select('status')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Error fetching order status:', error);
      return { status: null };
    }

    return { status: data.status as OrderStatus };
  },

  // Stream order status updates using Supabase real-time
  streamOrderStatus: (id: string, onUpdate: (status: OrderStatus) => void): (() => void) => {
    // Subscribe to real-time updates for this order
    const subscription = supabase
      .channel(`order-${id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${id}`
        },
        (payload) => {
          if (payload.new && 'status' in payload.new) {
            onUpdate(payload.new.status as OrderStatus);
          }
        }
      )
      .subscribe();

    // Return cleanup function
    return () => {
      subscription.unsubscribe();
    };
  }
};


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderStatusTracker from '@/components/OrderStatusTracker';
import { Order, MenuItem } from '@/types';
import { api } from '@/services/api';

export default function OrderPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Fetch menu items
  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await api.getMenu();
        setMenuItems(response.items);
      } catch (err) {
        console.error('Error loading menu:', err);
      }
    }

    fetchMenu();
  }, []);

  useEffect(() => {
    async function fetchOrder() {
      if (!id) return;
      
      try {
        const response = await api.getOrder(id);
        setOrder(response.order);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h1>
        <p className="text-gray-600">The order you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Order Tracking</h1>
      <p className="text-gray-600 mb-8">Order ID: {order.id}</p>

      <OrderStatusTracker orderId={order.id} initialStatus={order.status} />

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Details</h2>
        
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Items:</h3>
          <div className="space-y-2">
            {order.items.map(item => {
              const menuItem = menuItems.find(m => m.id === item.menuItemId);
              if (!menuItem) return null;
              
              return (
                <div key={item.menuItemId} className="flex justify-between">
                  <span className="text-gray-700">
                    {menuItem.name} x {item.quantity}
                  </span>
                  <span className="text-gray-800 font-medium">
                    ${(menuItem.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Delivery Address:</h3>
          <p className="text-gray-600">{order.customerInfo.address}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Customer:</h3>
          <p className="text-gray-600">{order.customerInfo.name}</p>
          <p className="text-gray-600">{order.customerInfo.phone}</p>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span className="text-orange-600">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

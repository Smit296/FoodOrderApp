// POST /api/orders - Create a new order
import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data-store';
import { CartItem, CustomerInfo, OrderStatus } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerInfo } = body as {
      items: CartItem[];
      customerInfo: CustomerInfo;
    };

    // Validation
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart cannot be empty' },
        { status: 400 }
      );
    }

    if (!customerInfo?.name || !customerInfo?.address || !customerInfo?.phone) {
      return NextResponse.json(
        { error: 'Customer information is incomplete' },
        { status: 400 }
      );
    }

    // Validate phone format (simple validation)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(customerInfo.phone.replace(/[-\s]/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Calculate total
    let total = 0;
    for (const item of items) {
      const menuItem = DataStore.getMenuItemById(item.menuItemId);
      if (menuItem) {
        total += menuItem.price * item.quantity;
      }
    }

    // Create order
    const order = DataStore.createOrder({
      items,
      customerInfo,
      status: OrderStatus.RECEIVED,
      total
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

'use client';

import Cart from '@/components/Cart';
import { DataStore } from '@/lib/data-store';

export default function CartPage() {
  const menuItems = DataStore.getMenuItems();

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Cart</h1>
      <Cart menuItems={menuItems} />
    </div>
  );
}

import { useState, useEffect } from 'react';
import Cart from '@/components/Cart';
import { api } from '@/services/api';
import { MenuItem } from '@/types';

export default function CartPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await api.getMenu();
        setMenuItems(response.items);
      } catch (err) {
        console.error('Error loading menu:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Cart</h1>
      <Cart menuItems={menuItems} />
    </div>
  );
}

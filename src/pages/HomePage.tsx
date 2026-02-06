import { useState, useEffect } from 'react';
import MenuList from '@/components/MenuList';
import { api } from '@/services/api';
import { MenuItem } from '@/types';

export default function HomePage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await api.getMenu();
        setMenuItems(response.items);
      } catch (err) {
        console.error('Error loading menu:', err);
        setError('Failed to load menu items. Please try again later.');
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
        <p className="mt-4 text-gray-600">Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Menu</h1>
        <p className="text-gray-600">Choose your favorite dishes and add them to your cart</p>
      </div>
      
      <MenuList items={menuItems} />
    </div>
  );
}

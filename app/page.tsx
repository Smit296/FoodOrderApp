import MenuList from '@/components/MenuList';
import { DataStore } from '@/lib/data-store';

export default function Home() {
  const menuItems = DataStore.getMenuItems();

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

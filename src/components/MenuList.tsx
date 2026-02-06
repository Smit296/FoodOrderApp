import { useState } from 'react';
import { MenuItem } from '@/types';
import { useCart } from '@/lib/cart-context';
import Pagination from './Pagination';

interface MenuListProps {
  items: MenuItem[];
}

export default function MenuList({ items }: MenuListProps) {
  const { addToCart, cart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const getItemQuantity = (itemId: string) => {
    const cartItem = cart.find(item => item.menuItemId === itemId);
    return cartItem?.quantity || 0;
  };

  // Calculate pagination
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-80 bg-gray-200">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-orange-600">
                  ${item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(item.id)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Add to Cart
                  {getItemQuantity(item.id) > 0 && (
                    <span className="ml-2 bg-white text-orange-600 px-2 py-0.5 rounded-full text-sm">
                      {getItemQuantity(item.id)}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

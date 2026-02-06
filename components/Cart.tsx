'use client';

import { MenuItem } from '@/types';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';

interface CartProps {
  menuItems: MenuItem[];
}

export default function Cart({ menuItems }: CartProps) {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Your cart is empty</p>
        <Link
          href="/"
          className="mt-4 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {cart.map(cartItem => {
          const menuItem = menuItems.find(item => item.id === cartItem.menuItemId);
          if (!menuItem) return null;

          return (
            <div
              key={cartItem.menuItemId}
              className="bg-white rounded-lg shadow p-4 flex items-center gap-4"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{menuItem.name}</h3>
                <p className="text-orange-600 font-medium">
                  ${menuItem.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(cartItem.menuItemId, cartItem.quantity - 1)}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{cartItem.quantity}</span>
                <button
                  onClick={() => updateQuantity(cartItem.menuItemId, cartItem.quantity + 1)}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(cartItem.menuItemId)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <span className="text-orange-600">${getCartTotal(menuItems).toFixed(2)}</span>
        </div>
        <Link
          href="/checkout"
          className="mt-4 block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-lg transition-colors font-medium"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

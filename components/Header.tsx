'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { getCartItemCount } = useCart();
  const pathname = usePathname();
  const cartCount = getCartItemCount();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-orange-600">
            🍔 Food Delivery
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`font-medium ${
                pathname === '/' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Menu
            </Link>
            <Link
              href="/cart"
              className={`font-medium relative ${
                pathname === '/cart' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

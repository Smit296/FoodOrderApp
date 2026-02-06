'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutForm from '@/components/CheckoutForm';
import { useCart } from '@/lib/cart-context';
import { CustomerInfo } from '@/types';
import { DataStore } from '@/lib/data-store';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, getCartTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const menuItems = DataStore.getMenuItems();

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Checkout</h1>
        <p className="text-gray-600">Your cart is empty. Add some items first!</p>
      </div>
    );
  }

  const handleSubmit = async (customerInfo: CustomerInfo) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          customerInfo,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const data = await response.json();
      clearCart();
      router.push(`/orders/${data.order.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          {cart.map(cartItem => {
            const menuItem = menuItems.find(item => item.id === cartItem.menuItemId);
            if (!menuItem) return null;
            
            return (
              <div key={cartItem.menuItemId} className="flex justify-between">
                <span className="text-gray-700">
                  {menuItem.name} x {cartItem.quantity}
                </span>
                <span className="text-gray-800 font-medium">
                  ${(menuItem.price * cartItem.quantity).toFixed(2)}
                </span>
              </div>
            );
          })}
          <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-orange-600">${getCartTotal(menuItems).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
        <CheckoutForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}

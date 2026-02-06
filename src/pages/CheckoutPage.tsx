import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '@/components/CheckoutForm';
import { useCart } from '@/lib/cart-context';
import { CustomerInfo, MenuItem } from '@/types';
import { api } from '@/services/api';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart, getCartTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loadingMenu, setLoadingMenu] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await api.getMenu();
        setMenuItems(response.items);
      } catch (err) {
        console.error('Error loading menu:', err);
      } finally {
        setLoadingMenu(false);
      }
    }

    fetchMenu();
  }, []);

  if (loadingMenu) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

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
      const response = await api.createOrder(cart, customerInfo);
      clearCart();
      navigate(`/orders/${response.order.id}`);
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

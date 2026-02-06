// In-memory data store for menu items and orders
import { MenuItem, Order, OrderStatus } from '@/types';

// Sample menu items
const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Margherita Pizza',
    description: 'Fresh mozzarella, tomato sauce, basil',
    price: 12.99,
    image: '/images/pizza.svg',
    category: 'Pizza'
  },
  {
    id: '2',
    name: 'Cheeseburger Deluxe',
    description: 'Beef patty, cheddar, lettuce, tomato, special sauce',
    price: 10.99,
    image: '/images/burger.svg',
    category: 'Burgers'
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Romaine lettuce, parmesan, croutons, Caesar dressing',
    price: 8.99,
    image: '/images/salad.svg',
    category: 'Salads'
  },
  {
    id: '4',
    name: 'Chicken Wings',
    description: '10 crispy wings with your choice of sauce',
    price: 11.99,
    image: '/images/wings.svg',
    category: 'Appetizers'
  },
  {
    id: '5',
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni with mozzarella and tomato sauce',
    price: 14.99,
    image: '/images/pepperoni-pizza.svg',
    category: 'Pizza'
  },
  {
    id: '6',
    name: 'Veggie Burger',
    description: 'Plant-based patty with fresh vegetables',
    price: 9.99,
    image: '/images/veggie-burger.svg',
    category: 'Burgers'
  },
  {
    id: '7',
    name: 'French Fries',
    description: 'Crispy golden fries with sea salt',
    price: 4.99,
    image: '/images/fries.svg',
    category: 'Sides'
  },
  {
    id: '8',
    name: 'Chocolate Brownie',
    description: 'Warm chocolate brownie with vanilla ice cream',
    price: 6.99,
    image: '/images/brownie.svg',
    category: 'Desserts'
  },
  {
    id: '9',
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with bacon, eggs, and parmesan',
    price: 13.99,
    image: 'https://placehold.co/400x400/FFE5B4/8B4513?text=Pasta',
    category: 'Pasta'
  },
  {
    id: '10',
    name: 'BBQ Ribs',
    description: 'Tender pork ribs with smoky BBQ sauce',
    price: 18.99,
    image: 'https://placehold.co/400x400/F4A460/8B4513?text=BBQ+Ribs',
    category: 'Mains'
  },
  {
    id: '11',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce',
    price: 19.99,
    image: 'https://placehold.co/400x400/FFA07A/8B4513?text=Salmon',
    category: 'Seafood'
  },
  {
    id: '12',
    name: 'Chicken Tacos',
    description: 'Three soft tacos with grilled chicken and fresh salsa',
    price: 11.99,
    image: 'https://placehold.co/400x400/FFD700/8B4513?text=Tacos',
    category: 'Mexican'
  },
  {
    id: '13',
    name: 'Greek Salad',
    description: 'Cucumbers, tomatoes, feta cheese, olives, olive oil',
    price: 9.99,
    image: '/images/salad.svg',
    category: 'Salads'
  },
  {
    id: '14',
    name: 'Club Sandwich',
    description: 'Triple-decker with turkey, bacon, lettuce, and tomato',
    price: 12.99,
    image: 'https://placehold.co/400x400/F5DEB3/8B4513?text=Sandwich',
    category: 'Sandwiches'
  },
  {
    id: '15',
    name: 'Onion Rings',
    description: 'Crispy beer-battered onion rings with ranch dip',
    price: 5.99,
    image: 'https://placehold.co/400x400/DEB887/8B4513?text=Onion+Rings',
    category: 'Sides'
  },
  {
    id: '16',
    name: 'Tiramisu',
    description: 'Italian coffee-flavored dessert with mascarpone',
    price: 7.99,
    image: 'https://placehold.co/400x400/FAEBD7/8B4513?text=Tiramisu',
    category: 'Desserts'
  },
  {
    id: '17',
    name: 'Hawaiian Pizza',
    description: 'Ham, pineapple, mozzarella, tomato sauce',
    price: 13.99,
    image: '/images/pizza.svg',
    category: 'Pizza'
  },
  {
    id: '18',
    name: 'Beef Burrito',
    description: 'Large flour tortilla with seasoned beef, rice, and beans',
    price: 10.99,
    image: 'https://placehold.co/400x400/CD853F/8B4513?text=Burrito',
    category: 'Mexican'
  },
  {
    id: '19',
    name: 'Miso Ramen',
    description: 'Japanese noodle soup with pork, egg, and vegetables',
    price: 14.99,
    image: 'https://placehold.co/400x400/FFE4B5/8B4513?text=Ramen',
    category: 'Asian'
  },
  {
    id: '20',
    name: 'Chicken Alfredo',
    description: 'Fettuccine pasta in creamy parmesan sauce with grilled chicken',
    price: 15.99,
    image: 'https://placehold.co/400x400/FFEFD5/8B4513?text=Alfredo',
    category: 'Pasta'
  },
  {
    id: '21',
    name: 'Fish and Chips',
    description: 'Beer-battered cod with crispy fries and tartar sauce',
    price: 14.99,
    image: 'https://placehold.co/400x400/F0E68C/8B4513?text=Fish+%26+Chips',
    category: 'Seafood'
  },
  {
    id: '22',
    name: 'Pancake Stack',
    description: 'Fluffy buttermilk pancakes with maple syrup and butter',
    price: 8.99,
    image: 'https://placehold.co/400x400/FFDAB9/8B4513?text=Pancakes',
    category: 'Breakfast'
  },
  {
    id: '23',
    name: 'Iced Coffee',
    description: 'Cold brew coffee with milk and ice',
    price: 4.99,
    image: 'https://placehold.co/400x400/D2B48C/8B4513?text=Iced+Coffee',
    category: 'Beverages'
  },
  {
    id: '24',
    name: 'Cheese Nachos',
    description: 'Tortilla chips with melted cheese, jalapeños, and sour cream',
    price: 9.99,
    image: 'https://placehold.co/400x400/FFE4C4/8B4513?text=Nachos',
    category: 'Appetizers'
  }
];

// In-memory storage
const orders = new Map<string, Order>();

export const DataStore = {
  // Menu operations
  getMenuItems: (): MenuItem[] => {
    return menuItems;
  },

  getMenuItemById: (id: string): MenuItem | undefined => {
    return menuItems.find(item => item.id === id);
  },

  // Order operations
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    orders.set(newOrder.id, newOrder);
    return newOrder;
  },

  getOrderById: (id: string): Order | undefined => {
    return orders.get(id);
  },

  updateOrderStatus: (id: string, status: OrderStatus): Order | undefined => {
    const order = orders.get(id);
    if (order) {
      order.status = status;
      order.updatedAt = new Date();
      orders.set(id, order);
    }
    return order;
  },

  getAllOrders: (): Order[] => {
    return Array.from(orders.values());
  }
};

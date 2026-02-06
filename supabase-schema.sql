-- =============================================
-- Food Delivery App - Supabase Database Schema
-- =============================================

-- Enable UUID extension for generating IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLE: menu_items
-- Stores all menu items available for order
-- =============================================
CREATE TABLE menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: orders
-- Stores customer orders
-- =============================================
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'RECEIVED' CHECK (status IN ('RECEIVED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED')),
  total DECIMAL(10, 2) NOT NULL CHECK (total >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: order_items
-- Junction table for orders and menu items
-- =============================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id TEXT NOT NULL REFERENCES menu_items(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES for better query performance
-- =============================================
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_menu_items_category ON menu_items(category);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Allow public read access, restrict writes
-- =============================================

-- Enable RLS on all tables
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Menu Items: Public read access
CREATE POLICY "Allow public read access to menu items" 
  ON menu_items FOR SELECT 
  TO public 
  USING (true);

-- Orders: Allow anyone to create orders
CREATE POLICY "Allow anyone to create orders" 
  ON orders FOR INSERT 
  TO public 
  WITH CHECK (true);

-- Orders: Allow public read access
CREATE POLICY "Allow public read access to orders" 
  ON orders FOR SELECT 
  TO public 
  USING (true);

-- Orders: Allow public update (for status changes)
CREATE POLICY "Allow public update to orders" 
  ON orders FOR UPDATE 
  TO public 
  USING (true);

-- Order Items: Allow anyone to create order items
CREATE POLICY "Allow anyone to create order items" 
  ON order_items FOR INSERT 
  TO public 
  WITH CHECK (true);

-- Order Items: Allow public read access
CREATE POLICY "Allow public read access to order items" 
  ON order_items FOR SELECT 
  TO public 
  USING (true);

-- =============================================
-- FUNCTION: Update updated_at timestamp
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SEED DATA: Insert Menu Items
-- =============================================
INSERT INTO menu_items (id, name, description, price, image, category) VALUES
  ('1', 'Classic Margherita Pizza', 'Fresh mozzarella, tomato sauce, basil', 12.99, '/images/pizza.svg', 'Pizza'),
  ('2', 'Cheeseburger Deluxe', 'Beef patty, cheddar, lettuce, tomato, special sauce', 10.99, '/images/burger.svg', 'Burgers'),
  ('3', 'Caesar Salad', 'Romaine lettuce, parmesan, croutons, Caesar dressing', 8.99, '/images/salad.svg', 'Salads'),
  ('4', 'Chicken Wings', '10 crispy wings with your choice of sauce', 11.99, '/images/wings.svg', 'Appetizers'),
  ('5', 'Pepperoni Pizza', 'Classic pepperoni with mozzarella and tomato sauce', 14.99, '/images/pepperoni-pizza.svg', 'Pizza'),
  ('6', 'Veggie Burger', 'Plant-based patty with fresh vegetables', 9.99, '/images/veggie-burger.svg', 'Burgers'),
  ('7', 'French Fries', 'Crispy golden fries with sea salt', 4.99, '/images/fries.svg', 'Sides'),
  ('8', 'Chocolate Brownie', 'Warm chocolate brownie with vanilla ice cream', 6.99, '/images/brownie.svg', 'Desserts'),
  ('9', 'Spaghetti Carbonara', 'Classic Italian pasta with bacon, eggs, and parmesan', 13.99, 'https://placehold.co/400x400/FFE5B4/8B4513?text=Pasta', 'Pasta'),
  ('10', 'BBQ Ribs', 'Tender pork ribs with smoky BBQ sauce', 18.99, 'https://placehold.co/400x400/F4A460/8B4513?text=BBQ+Ribs', 'Mains'),
  ('11', 'Grilled Salmon', 'Fresh Atlantic salmon with lemon butter sauce', 19.99, 'https://placehold.co/400x400/FFA07A/8B4513?text=Salmon', 'Seafood'),
  ('12', 'Chicken Tacos', 'Three soft tacos with grilled chicken and fresh salsa', 11.99, 'https://placehold.co/400x400/FFD700/8B4513?text=Tacos', 'Mexican'),
  ('13', 'Greek Salad', 'Cucumbers, tomatoes, feta cheese, olives, olive oil', 9.99, '/images/salad.svg', 'Salads'),
  ('14', 'Club Sandwich', 'Triple-decker with turkey, bacon, lettuce, and tomato', 12.99, 'https://placehold.co/400x400/F5DEB3/8B4513?text=Sandwich', 'Sandwiches'),
  ('15', 'Onion Rings', 'Crispy beer-battered onion rings with ranch dip', 5.99, 'https://placehold.co/400x400/DEB887/8B4513?text=Onion+Rings', 'Sides'),
  ('16', 'Tiramisu', 'Italian coffee-flavored dessert with mascarpone', 7.99, 'https://placehold.co/400x400/FAEBD7/8B4513?text=Tiramisu', 'Desserts'),
  ('17', 'Hawaiian Pizza', 'Ham, pineapple, mozzarella, tomato sauce', 13.99, '/images/pizza.svg', 'Pizza'),
  ('18', 'Beef Burrito', 'Large flour tortilla with seasoned beef, rice, and beans', 10.99, 'https://placehold.co/400x400/CD853F/8B4513?text=Burrito', 'Mexican'),
  ('19', 'Miso Ramen', 'Japanese noodle soup with pork, egg, and vegetables', 14.99, 'https://placehold.co/400x400/FFE4B5/8B4513?text=Ramen', 'Asian'),
  ('20', 'Chicken Alfredo', 'Fettuccine pasta in creamy parmesan sauce with grilled chicken', 15.99, 'https://placehold.co/400x400/FFEFD5/8B4513?text=Alfredo', 'Pasta'),
  ('21', 'Fish and Chips', 'Beer-battered cod with crispy fries and tartar sauce', 14.99, 'https://placehold.co/400x400/F0E68C/8B4513?text=Fish+%26+Chips', 'Seafood'),
  ('22', 'Pancake Stack', 'Fluffy buttermilk pancakes with maple syrup and butter', 8.99, 'https://placehold.co/400x400/FFDAB9/8B4513?text=Pancakes', 'Breakfast'),
  ('23', 'Iced Coffee', 'Cold brew coffee with milk and ice', 4.99, 'https://placehold.co/400x400/D2B48C/8B4513?text=Iced+Coffee', 'Beverages'),
  ('24', 'Cheese Nachos', 'Tortilla chips with melted cheese, jalapeños, and sour cream', 9.99, 'https://placehold.co/400x400/FFE4C4/8B4513?text=Nachos', 'Appetizers');

-- =============================================
-- VERIFICATION QUERIES
-- =============================================
-- Run these after setup to verify:
-- SELECT COUNT(*) FROM menu_items; -- Should return 24
-- SELECT * FROM menu_items LIMIT 5;
-- SELECT * FROM orders;
-- SELECT * FROM order_items;

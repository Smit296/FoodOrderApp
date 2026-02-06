-- =============================================
-- FIX: Disable RLS Temporarily for Testing
-- Run this in Supabase SQL Editor to fix 401 error
-- =============================================

-- Disable RLS on all tables (for testing/development)
ALTER TABLE menu_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;

-- Verify tables are accessible
SELECT COUNT(*) FROM menu_items;
-- Should return: 24

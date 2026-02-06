# Supabase Database Setup Guide

## Overview
This guide will help you set up the Supabase database for your food delivery application.

## Prerequisites
- A Supabase account (free tier available at https://supabase.com)
- Your Supabase project created
- Environment variables already configured in `.env` file

## Step 1: Access Supabase SQL Editor

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Click on your project: **qpslwttgwvhnxyxlujty**
3. Navigate to **SQL Editor** in the left sidebar
4. Click **+ New query** button

## Step 2: Run the Database Schema

1. Copy the entire contents of `supabase-schema.sql` file (located in your project root)
2. Paste it into the SQL Editor
3. Click **Run** button (or press Ctrl/Cmd + Enter)

The script will:
- ✅ Create 3 tables: `menu_items`, `orders`, `order_items`
- ✅ Set up indexes for better performance
- ✅ Configure Row Level Security (RLS) policies
- ✅ Add triggers for automatic timestamp updates
- ✅ Insert 24 menu items with sample data

## Step 3: Verify the Setup

After running the script, verify everything is working:

### Check Tables
Navigate to **Table Editor** in the left sidebar. You should see:
- **menu_items** (24 rows)
- **orders** (0 rows initially)
- **order_items** (0 rows initially)

### Run Verification Query
In the SQL Editor, run:
```sql
SELECT COUNT(*) FROM menu_items;
```
Should return: **24**

```sql
SELECT * FROM menu_items LIMIT 5;
```
Should show the first 5 menu items.

## Step 4: Enable Realtime (Optional but Recommended)

For live order status updates:

1. Go to **Database** → **Replication** in the left sidebar
2. Find the `orders` table
3. Toggle **Enable** for Realtime
4. This allows the frontend to receive live updates when order status changes

## Step 5: Test the Frontend

1. Your dev server should already be running (`npm run dev`)
2. **Restart the dev server** to load the new environment variables:
   ```bash
   # Press Ctrl+C in the terminal
   npm run dev
   ```
3. Open http://localhost:3000/ in your browser
4. You should see all 24 menu items loaded from Supabase

## Troubleshooting

### Menu items not loading?
- Check browser console for errors
- Verify `.env` file has correct credentials
- Ensure dev server was restarted after creating `.env`
- Check Supabase SQL Editor for any script errors

### Orders not being created?
- Check browser console for errors
- Verify Row Level Security policies are set up correctly
- Check Supabase **Logs** section for errors

### Real-time updates not working?
- Ensure Realtime is enabled for the `orders` table
- Check browser console for WebSocket connection errors

## What's Next?

Once the database is set up, you can:

1. **Create orders** - Go through the checkout flow
2. **Test order tracking** - View orders in real-time
3. **Update order status manually** in Supabase Table Editor:
   - Go to **Table Editor** → **orders**
   - Click on an order
   - Change the `status` field
   - The frontend will update automatically!

## Managing the Database

### View All Orders
```sql
SELECT * FROM orders ORDER BY created_at DESC;
```

### View Order Details with Items
```sql
SELECT 
  o.id,
  o.customer_name,
  o.status,
  o.total,
  oi.quantity,
  mi.name AS menu_item,
  mi.price
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN menu_items mi ON oi.menu_item_id = mi.id
WHERE o.id = 'YOUR_ORDER_ID_HERE';
```

### Update Order Status
```sql
UPDATE orders 
SET status = 'PREPARING'  -- or 'OUT_FOR_DELIVERY' or 'DELIVERED'
WHERE id = 'YOUR_ORDER_ID_HERE';
```

### Add New Menu Items
```sql
INSERT INTO menu_items (id, name, description, price, image, category)
VALUES ('25', 'New Dish', 'Description here', 15.99, '/images/dish.svg', 'Category');
```

## Security Notes

- The `.env` file is already in `.gitignore` and won't be committed to git
- The `VITE_SUPABASE_ANON_KEY` is safe to use in frontend code
- Row Level Security is enabled to protect your data
- Current policies allow public read/write (suitable for demo)
- For production, implement user authentication and restrict policies

## Support

If you encounter issues:
1. Check the Supabase **Logs** section
2. Check browser console for errors
3. Verify all SQL scripts ran successfully
4. Ensure environment variables are correct

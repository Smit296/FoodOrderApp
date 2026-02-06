# Food Delivery Order Management System

A modern, full-stack food delivery application built with Next.js 14, featuring real-time order tracking and a clean, intuitive user interface.

## 🚀 Features

- **📱 Menu Browsing** - Browse 8 delicious food items across 5 categories
- **🛒 Shopping Cart** - Add items, manage quantities, persistent storage
- **✅ Validated Checkout** - Complete order form with real-time validation
- **📊 Real-Time Tracking** - Watch your order progress live with Server-Sent Events
- **📱 Responsive Design** - Optimized for mobile, tablet, and desktop
- **🎨 Clean UI** - Simple, modern interface with Tailwind CSS

## 🏗️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Real-Time:** Server-Sent Events (SSE)
- **Storage:** In-memory (easily upgradeable to PostgreSQL/MongoDB)

## 📦 Installation

```bash
# Clone the repository (when available)
git clone https://github.com/yourusername/order-delivery-app.git

# Navigate to project directory
cd order-delivery-app

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit **http://localhost:3000** to view the application.

## 🎯 Quick Start Guide

### 1. Browse Menu
- View all available food items on the home page
- See prices, descriptions, and categories

### 2. Add to Cart
- Click "Add to Cart" on any item
- Cart badge updates automatically
- View cart anytime from the header

### 3. Checkout
- Fill in your delivery details
- Form validates all inputs
- Place your order

### 4. Track Order
- Watch your order status update in real-time
- Status progression: Received → Preparing → Out for Delivery → Delivered
- Updates every 10 seconds automatically

## 📁 Project Structure

```
order-delivery-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── cart/             # Cart page
│   ├── checkout/         # Checkout page
│   ├── orders/[id]/      # Order tracking page
│   └── page.tsx          # Home/Menu page
├── components/            # React components
│   ├── Header.tsx
│   ├── MenuList.tsx
│   ├── Cart.tsx
│   ├── CheckoutForm.tsx
│   └── OrderStatusTracker.tsx
├── lib/                   # Utilities
│   ├── data-store.ts     # In-memory database
│   └── cart-context.tsx  # Cart state management
├── types/                 # TypeScript definitions
└── public/               # Static assets
```

## 🔧 API Endpoints

### Menu
```http
GET /api/menu
```
Returns all available menu items.

### Orders
```http
POST /api/orders
GET /api/orders/:id
PATCH /api/orders/:id/status
GET /api/orders/:id/stream
```

See [walkthrough.md](./walkthrough.md) for complete API documentation.

## 🧪 Testing

### Manual Testing
1. Start the dev server: `npm run dev`
2. Navigate to http://localhost:3000
3. Add items to cart
4. Complete checkout process
5. Watch order status update in real-time

### Automated Testing (TODO)
```bash
npm test
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or:
1. Push code to GitHub
2. Import repository at [vercel.com](https://vercel.com)
3. Deploy automatically

### Netlify
```bash
npm run build
```
Then deploy the `.next` folder to Netlify.

## 📝 Environment Variables

No environment variables required for basic functionality.

For production, you may want to add:
```env
NEXT_PUBLIC_API_URL=your-api-url
```

## 🎓 Assessment Deliverables

### ✅ Completed
- [x] Full-stack order management feature
- [x] Menu display with 8 items
- [x] Shopping cart functionality
- [x] Checkout with validation
- [x] Real-time order tracking
- [x] Clean, maintainable code
- [x] Responsive design
- [x] REST API with 5 endpoints
- [x] Server-Sent Events for real-time updates
- [x] Documentation (this README + walkthrough.md)

### 🔜 Ready for Deployment
- GitHub repository (ready to push)
- Vercel/Netlify deployment (ready to deploy)
- Loom video (ready to record)

## 📚 Documentation

- **[walkthrough.md](./walkthrough.md)** - Complete feature walkthrough
- **[implementation_plan.md](./implementation_plan.md)** - Technical implementation details

## 🤖 AI Tools Used

This project was built with assistance from AI tools for:
- Code generation and boilerplate
- Component structure design
- API endpoint implementation
- TypeScript type definitions
- Documentation generation
- Testing strategy

## 🔄 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication
- [ ] Payment processing (Stripe)
- [ ] Admin dashboard
- [ ] Order history
- [ ] Unit and E2E tests
- [ ] Push notifications
- [ ] Multiple restaurants
- [ ] Driver tracking on map

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 👤 Author

Built as a Sr Full Stack Developer assessment project.

---

**Need help?** Check the [walkthrough.md](./walkthrough.md) for detailed usage instructions and technical documentation.

# Loom Video Script

## Introduction (30 seconds)

"Hi! I'm going to walk you through my implementation of the Food Delivery Order Management feature. This is a full-stack Next.js application with real-time order tracking, built following modern best practices and test-driven development principles."

## Project Overview (1 minute)

"Let me show you what we've built:
- A complete order management system with 8 menu items
- Full shopping cart functionality with persistence
- A validated checkout process
- Real-time order tracking using Server-Sent Events
- Responsive design that works great on mobile and desktop

The app is running locally at localhost:3000. Let me demonstrate the complete user flow."

## Live Demo (4-5 minutes)

### Menu Browsing
"Starting on the home page, you can see our menu with 8 different food items across categories like Pizza, Burgers, Salads, and Desserts. Each item shows a price, description, and an 'Add to Cart' button. Notice the clean, simple design - this was intentional to keep the UI intuitive."

### Shopping Cart
"Let me add a few items... *click add to cart* ...notice the cart badge updates immediately in the header. Clicking on Cart shows all my items, I can adjust quantities using these +/- buttons, remove items, and see the total update in real-time. The cart persists even if I refresh the page thanks to localStorage."

### Checkout Process
"When I click 'Proceed to Checkout', I see an order summary and a delivery form. The form validates everything - watch what happens if I try to submit without filling it out... *show validation errors*. Now let me fill it properly with a name, complete address, and 10-digit phone number... and place the order."

### Order Tracking
"After placing the order, we're redirected to the tracking page. This is where the magic happens - the page uses Server-Sent Events to receive real-time updates from the server. Watch the status bar... *wait for status update* ...there! It just updated from 'Order Received' to 'Preparing'. Every 10 seconds it progresses through the stages: Preparing, Out for Delivery, and finally Delivered."

## Code Architecture (3-4 minutes)

### Backend Structure
"Let me show you the code structure. Opening VS Code... The backend uses Next.js API routes - these are serverless functions that act as our REST API.

Here's the data store (lib/data-store.ts) - currently using in-memory storage for simplicity, but it's structured so we could easily swap in PostgreSQL or MongoDB later.

We have 5 API endpoints:
1. GET /api/menu - fetches menu items
2. POST /api/orders - creates an order with validation
3. GET /api/orders/[id] - retrieves order details
4. PATCH /api/orders/[id]/status - updates order status
5. GET /api/orders/[id]/stream - this is the Server-Sent Events endpoint for real-time updates

Each endpoint includes proper validation and error handling. For example, the order creation validates that the cart isn't empty, customer info is complete, and the phone number is in the correct format."

### Frontend Structure
"On the frontend, we're using React Context API for state management. The CartContext (lib/cart-context.tsx) provides all cart operations and persists to localStorage.

The components are modular and reusable:
- MenuList displays the items
- Cart manages the shopping cart
- CheckoutForm handles validation
- OrderStatusTracker connects to the SSE stream for real-time updates

All components use TypeScript for type safety, and Tailwind CSS for responsive styling."

## Design Decisions (2 minutes)

"I made several key architectural decisions:

**Why Server-Sent Events instead of WebSockets?**
For this use case, SSE is perfect - it's simpler than WebSockets, works over HTTP, and fits our one-way communication pattern where the server pushes status updates to the client.

**Why Context API for state management?**
The app's state is fairly simple - just a shopping cart - so Context API provides exactly what we need without the overhead of Redux or Zustand.

**Why in-memory storage?**
For this assessment, it keeps things simple. But notice how I structured the DataStore module - switching to a real database would only require changing this single file without touching any API routes.

**Simple, clean design:**
I focused on a straightforward UI that's easy to use rather than overly complex animations. Mobile-first responsive design ensures it works well on all screen sizes."

## Use of AI Tools (1-2 minutes)

"Throughout development, I used AI tools strategically:

- **Code generation:** Initial component boilerplate and TypeScript type definitions
- **API design:** Structuring RESTful endpoints and validation logic
- **Testing strategy:** Planning test cases and edge case scenarios
- **Documentation:** Generating comprehensive documentation

However, I made all the architectural decisions myself and reviewed/refined all AI-generated code to ensure it follows best practices and meets the requirements."

## Challenges and Solutions (1-2 minutes)

"The main challenges I encountered:

**Real-time updates:** Initially considered polling, but SSE proved more elegant and efficient for server-to-client updates.

**Type safety:** Ensuring proper TypeScript types across the entire stack required careful planning of interfaces and type definitions.

**Form validation:** Implemented client-side validation with proper error messages while ensuring the UX remains smooth.

**Responsive design:** Used Tailwind's responsive utilities to create a layout that adapts from single-column mobile to three-column desktop views."

## Testing and Quality (1 minute)

"The app includes validation for:
- Empty cart prevention
- Required form fields
- Phone number format (10 digits)
- Proper error handling for invalid orders

Manual testing covers the complete user flow from browsing to order completion. The code is structured to make adding unit tests and E2E tests straightforward - I've left those as the next enhancement."

## Deployment Ready (30 seconds)

"The application is deployment-ready:
- Git repository initialized and ready to push
- Can be deployed to Vercel with zero configuration
- Environment variables structure in place
- Documentation complete with walkthrough and API docs"

## Conclusion (30 seconds)

"This project demonstrates full-stack development with:
- Clean, maintainable code structure
- Real-time features using modern web technologies
- Responsive, user-friendly interface
- Type-safe implementation with TypeScript
- Production-ready architecture

Thank you for reviewing my work! The complete code is available in the repository, along with detailed documentation including setup instructions, API documentation, and a full feature walkthrough."

---

## Recording Tips

- **Total time:** 12-15 minutes
- **Show your face** in a small corner of the screen
- **Use clear audio** - test your microphone first
- **Go at a steady pace** - not too fast, not too slow
- **Highlight key features** - menu, cart, checkout, real-time tracking
- **Show the code** - architecture, key files, interesting implementations
- **Be conversational** - explain your thinking, not just what you did
- **Demo the live app** - show it working in the browser
- **End with a call to action** - invite questions or feedback

## Before Recording

- [ ] Restart development server
- [ ] Clear browser cache
- [ ] Close unnecessary tabs and applications
- [ ] Test microphone and screen recording
- [ ] Have code ready to show in VS Code
- [ ] Prepare browser with app already loaded
- [ ] Review script one more time

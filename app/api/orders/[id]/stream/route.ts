// GET /api/orders/[id]/stream - Server-Sent Events for real-time order status updates
import { NextRequest } from 'next/server';
import { DataStore } from '@/lib/data-store';
import { OrderStatus } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = DataStore.getOrderById(id);

  if (!order) {
    return new Response('Order not found', { status: 404 });
  }

  // Create a readable stream for SSE
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial status
      const sendUpdate = (status: OrderStatus) => {
        const data = `data: ${JSON.stringify({ status, timestamp: new Date() })}\n\n`;
        controller.enqueue(encoder.encode(data));
      };

      sendUpdate(order.status);

      // Simulate status progression
      const statusProgression = [
        OrderStatus.RECEIVED,
        OrderStatus.PREPARING,
        OrderStatus.OUT_FOR_DELIVERY,
        OrderStatus.DELIVERED
      ];

      const currentIndex = statusProgression.indexOf(order.status);

      for (let i = currentIndex + 1; i < statusProgression.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds between updates
        const newStatus = statusProgression[i];
        DataStore.updateOrderStatus(id, newStatus);
        sendUpdate(newStatus);
      }

      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

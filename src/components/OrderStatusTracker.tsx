import { useEffect, useState } from 'react';
import { OrderStatus } from '@/types';
import { api } from '@/services/api';

interface OrderStatusTrackerProps {
  orderId: string;
  initialStatus: OrderStatus;
}

const statusSteps = [
  { status: OrderStatus.RECEIVED, label: 'Order Received', icon: '✓' },
  { status: OrderStatus.PREPARING, label: 'Preparing', icon: '👨‍🍳' },
  { status: OrderStatus.OUT_FOR_DELIVERY, label: 'Out for Delivery', icon: '🚗' },
  { status: OrderStatus.DELIVERED, label: 'Delivered', icon: '🎉' }
];

export default function OrderStatusTracker({ orderId, initialStatus }: OrderStatusTrackerProps) {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(initialStatus);

  useEffect(() => {
    // Use mock API streaming for real-time updates
    const cleanup = api.streamOrderStatus(orderId, (status) => {
      setCurrentStatus(status);
    });

    return cleanup;
  }, [orderId]);

  const currentStepIndex = statusSteps.findIndex(step => step.status === currentStatus);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Status</h2>
      
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-full bg-orange-500 transition-all duration-500"
            style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Status steps */}
        <div className="relative flex justify-between">
          {statusSteps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.status} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors ${
                    isCompleted
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  } ${isCurrent ? 'ring-4 ring-orange-200' : ''}`}
                >
                  {step.icon}
                </div>
                <p
                  className={`mt-2 text-sm text-center ${
                    isCompleted ? 'text-gray-800 font-medium' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {currentStatus === OrderStatus.DELIVERED && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-800 font-medium">
            🎉 Your order has been delivered! Enjoy your meal!
          </p>
        </div>
      )}
    </div>
  );
}

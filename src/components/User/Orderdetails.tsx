import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface FoodItem {
  foodItem: {
    name: string;
    price: number;
  };
  quantity: number;
}

interface OrderDetails {
  user: {
    name: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  foodItems: FoodItem[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
}

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>(); // Get orderId from URL
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/order/${orderId}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Summary</h1>

      <div className="border p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold">Order Details</h2>
        <p><strong>Order Status:</strong> {orderDetails.orderStatus}</p>
        <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
        <p><strong>Payment Status:</strong> {orderDetails.paymentStatus}</p>
        <p><strong>Order Date:</strong> {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="border p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold">User Information</h2>
        <p><strong>Name:</strong> {orderDetails.user.name}</p>
        <p><strong>Email:</strong> {orderDetails.user.email}</p>
      </div>

      <div className="border p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold">Shipping Address</h2>
        <p>{orderDetails.address.street}</p>
        <p>{orderDetails.address.city}, {orderDetails.address.state}, {orderDetails.address.postalCode}</p>
        <p>{orderDetails.address.country}</p>
      </div>

      <div className="border p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold">Items Ordered</h2>
        {orderDetails.foodItems.map((item, index) => (
          <div key={index} className="flex justify-between mb-4">
            <div>
              <h3 className="text-xl">{item.foodItem.name}</h3>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <p className="text-lg font-semibold">Rs. {item.foodItem.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between border-t pt-4 mt-6">
        <h2 className="text-2xl font-bold">Total Amount</h2>
        <p className="text-2xl font-bold">Rs. {orderDetails.totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

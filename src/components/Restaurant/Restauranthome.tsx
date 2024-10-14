import React, { useState, useEffect } from 'react';
import MainLayout from './MainLayout';
import jwt_decode from 'jwt-decode'; // Correct import
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../store';

interface DecodedToken {
  restaurantId: string;
}

const Restauranthome: React.FC = () => {
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string[]>([
    "Order #1234: John has placed an order for 2 pizzas.",
    "Order #1235: Your order of 5 burgers has been confirmed.",
    "Order #1236: Sarah has ordered 3 salads.",
    "Order #1237: Delivery for order #1237 is on its way.",
    "Order #1238: Your order for 2 pasta dishes is being prepared."
  ]);

  const dispatch = useDispatch();
  const { isAuthenticated,loading,error ,restaurant} = useSelector((state: RootState) => state.restaurant);

console.log(restaurant,"repoooo")
console.log(isAuthenticated,"iss")
  const token = localStorage.getItem('restaurantToken');
  const userid=localStorage.getItem('userId')
  console.log(userid,"uuuu")

  // Check if token exists before parsing
  function parseJwt(token: string): DecodedToken | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window.atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload) as DecodedToken;
    } catch (error) {
      console.error('Failed to parse token:', error);
      return null;
    }
  }

  const newToken = token ? parseJwt(token) : null;

  useEffect(() => {
    if (newToken) {
      setRestaurantId(newToken.restaurantId);
    }
  }, [newToken]);



  return (
    <MainLayout>
      <div>
        <h1>Restaurant Home Page </h1>
        {restaurantId && <p>Restaurant ID: {restaurantId}</p>}

        <div className="notifications">
              <h3>Order Notifications</h3>
              <ul>
                {notifications.map((notification, index) => (
                  <li key={index}>{notification}</li>
                ))}
              </ul>
            </div>
      </div>
    </MainLayout>
  );
};

export default Restauranthome;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Headder from './Header';
import { removeCartItemApi, clearCartApi } from '../../actions/CartActions'; // Import the helper functions
import api from '../../api/Api';
const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [quantity,setQuantity]=useState<number>(0)
  const [isDisabled, setIsDisabled]= useState<boolean>(false);
  const storedUser = localStorage.getItem('user');
  const user = storedUser 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user && user) {
        try {
          const response = await api.get('http://localhost:5000/api/users/usercart', {
            params: { userId: user },
          });
          const fetchedCartItems = response.data.items;

          const foodDetailsPromises = fetchedCartItems.map(async (item: any) => {
            try {
              const foodResponse = await api.get('http://localhost:5000/api/users/fooditemid', {
                params: { foodItemId: item.foodItem },
              });
              setQuantity(foodResponse.data.quantity);
              console.log(foodResponse, "pppp")
              return {
                ...item,
                ...foodResponse.data,
                quantity: item.quantity || 1, // Set initial quantity to 1 if not present
              };
            } catch (foodError) {
              console.error('Error fetching food item:', foodError);
              return item;
            }
          });

          const detailedCartItems = await Promise.all(foodDetailsPromises);
          setCartItems(detailedCartItems);
        } catch (error) {
          console.error('Failed to fetch cart items:', error);
        }
      }
    };

    fetchCartItems();
  }, [storedUser]);

  const handleProceedToCheckout = () => {
    navigate('/checkout', { state: { cartItems } });
  };
console.log(quantity, "pppp")
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if(newQuantity > quantity){
    return  setIsDisabled(true);
    }
    setIsDisabled(false);
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = async (itemId: string) => {
    if (user) {
      try {
        await removeCartItemApi(user, itemId);
        setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
      } catch (error) {
        console.error('Failed to remove item from cart:', error);
      }
    }
  };

  const handleClearCart = async () => {
    if (user) {
      try {
        await clearCartApi(user);
        setCartItems([]);
      } catch (error) {
        console.error('Failed to clear cart:', error);
      }
    }
  };
  return (
    <>
      <Headder />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-extrabold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-lg text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item._id} className="border-b py-6 flex items-center space-x-4">
                <img
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-700 text-lg">Price: ${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                      -
                    </button>
                    <input
                      id={`quantity-${item._id}`}
                      type="number"
                      value={item.quantity}
                      readOnly
                      className="w-12 text-center border rounded-md"
                      disabled={isDisabled}
                    />
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-6 flex justify-between items-center border-t pt-4">
              <button
                onClick={handleClearCart}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition duration-200"
              >
                Clear Cart
              </button>
              <div className="text-xl font-bold text-gray-900">
                Total Price: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
              </div>
            </div>
            <button
              onClick={handleProceedToCheckout}
              className="mt-6 bg-blue-600 text-white px-8 py-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
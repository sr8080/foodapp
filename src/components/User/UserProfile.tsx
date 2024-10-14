import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import Headder from './Header';
import { useNavigate } from 'react-router-dom';

interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  // Fetch user details and addresses
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userdetails = localStorage.getItem('userdetails');

        if (userdetails) {
          const parsedUser = JSON.parse(userdetails);
          setUser(parsedUser);
        } else {
          setError('User details not found.');
        }

        // Fetch user addresses (commented as you mentioned API call later)
        // const addressResponse = await axios.get(`http://localhost:5000/api/address/user/${userId}`);
        // setAddresses(addressResponse.data);
      } catch (error) {
        setError('Error fetching user details or addresses.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleAddAddress = () => {
    navigate('/addaddress');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Headder />
      <div className="container mx-auto mt-6 p-4">
        <h1 className="text-2xl font-semibold mb-4">User Profile</h1>

        {user ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold">{user?.name || 'No Name Available'}</h2>
              <p className="text-gray-500">{user?.email || 'No Email Available'}</p>
              <p className="text-gray-500">Phone: {user?.phoneNumber || 'No Phone Number Available'}</p>
            </div>

            {/* User Addresses */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Addresses</h3>
              {addresses.length > 0 ? (
                addresses.map((address, index) => (
                  <div key={index} className="mt-4 p-4 bg-gray-100 rounded-md shadow-md">
                    <p><strong>Street:</strong> {address.street}</p>
                    <p><strong>City:</strong> {address.city}</p>
                    <p><strong>State:</strong> {address.state}</p>
                    <p><strong>Postal Code:</strong> {address.postalCode}</p>
                    <p><strong>Country:</strong> {address.country}</p>
                    {address.isDefault && <p className="text-green-500 font-semibold">Default Address</p>}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No addresses available.</p>
              )}

              {/* Add Address Button */}
              <button
                onClick={handleAddAddress}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Address
              </button>
            </div>
          </div>
        ) : (
          <div>No user details available.</div>
        )}
      </div>
    </>
  );
};

export default UserProfile;

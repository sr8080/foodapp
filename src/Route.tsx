import React from 'react';

import './App.css';
// import './index.css'
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Login from './components/User/Login';
import Register from './components/User/Register';
import OtpVerification from './components/User/Otpverification';
import Home from './components/User/Home';
import Adminlogin from './components/Admin/Adminlogin';
import AdminHome from './components/Admin/AdminHome';
import RegisterRestaurant from './components/Admin/RegisterRestaurant';
import RegisterDeliveryPerson from './components/Admin/RegisterDeliveryPerson';
import User from './components/Admin/User';
import TablePage from './components/Admin/TablePage';
import Restaurant from './components/Admin/Restaurant'
import Deliveryperson from './components/Admin/Deliveryperson'
import Restaurantlogin from './components/Restaurant/Restaurantlogin';
import Restauranthome from './components/Restaurant/Restauranthome';
import AddCategory from './components/Restaurant/CategoryAdd';
import AddCuisine from './components/Restaurant/Cuisineadd';
import AddFoodItem from './components/Restaurant/Addfooditem';
import Category from './components/Restaurant/Category';
import Cuisine from './components/Restaurant/Cuisine'
import Cat from './components/Restaurant/Cat'
import { CustomNavbar } from './components/User/NavbarComponent';
import FoodMenu from './components/User/Foodlist'
import FoodItemTable from './components/Restaurant/FoodItem'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from './store';
import Cart from './components/User/Cart';
import EditFoodItem from './components/Restaurant/Editfooditem';
import Navbar from './components/User/Navbar';
import Landing from './components/User/Landing'
import FoodItems from './components/User/Fooditems';
import RestaurantDetail from './components/User/Restaurantdetails';
import Profile from './components/Restaurant/Profile';
import { PrivateOutlet } from './utils/PrivateOutlet';
import CheckoutPage from './components/User/Checkout';
import UserProfile from './components/User/UserProfile';
import ChatPage from './components/User/Chat';
import AddAddress from './components/User/AddAddress';



function AppRoutes() {
  console.log("first")
const token = localStorage.getItem('token');
console.log(token,"token2");
  const admintoken=localStorage.getItem('admintoken')
  console.log(admintoken,"admin")
 console.log(token,"token")
  const { isAuthenticatedUser, loading, error, user } = useSelector((state: RootState) => state.auth);
  console.log(isAuthenticatedUser,"uusseerr500")
  const {isAuthenticated,restaurant} =useSelector((state:RootState)=>state.restaurant )
  console.log(isAuthenticated,"is resto")
  // const  isAuthenticated=token?true:false
  const isuserAuthenticated=!! token
  const adminisAuthenticated =!! admintoken
  
  console.log(isAuthenticatedUser,"auth")
  return (


    <Router>
      <Routes>
        {/* <Route path='/' element={isuserAuthenticated?<Home/>:<Login/>} /> */}
        <Route path='/' element={<Landing />} />
        {/* <Route path='/login' element={isuserAuthenticated?<Home/>:<Login/>} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/otp' element={<OtpVerification />} />
        <Route path='/home' element={<Home />} />

        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/chat/:id' element={<ChatPage/>} />
        <Route path='/addaddress' element={<AddAddress />} />
        {/* <Route path='/home' element={<Home />} /> */}
        <Route path='/admin' element={adminisAuthenticated?<AdminHome/>:<Adminlogin />} />
        <Route path='/admin-home' element={adminisAuthenticated?<AdminHome/>:<Adminlogin />} />
        <Route path='/restaurantregister' element={adminisAuthenticated?<RegisterRestaurant />:<Adminlogin />} />
        <Route path='/deliverypersonregister' element={adminisAuthenticated?<RegisterDeliveryPerson />:<Adminlogin />} />
        <Route path='/user' element={adminisAuthenticated?<TablePage/>:<Adminlogin />} />
        <Route path='/restaurant' element={adminisAuthenticated?<Restaurant/>:<Adminlogin />} />
        <Route path='/delivery-person' element={adminisAuthenticated?<Deliveryperson />:<Adminlogin/>}/>
        <Route path='/restaurantlogin' element={<Restaurantlogin />} />


        <Route element={<PrivateOutlet />}>
        <Route path='/restauranthome' element={<Restauranthome />} />
        </Route>
        
        <Route path='/addcategory' element={<AddCategory/>} />
        <Route path='/addcuisine' element={<AddCuisine />}  />
        <Route path='/food' element={<FoodItemTable />} />
        <Route path='/addfooditem' element={<AddFoodItem />} />
        <Route path='/category' element={<Category />} />
        <Route path='/cuisine' element={<Cuisine />} />
        <Route path='/cart' element={<Cart />} />
        {/* <Route path='/restaurant/:id' element={<FoodMenu/>}/> */}
        <Route path='/editfooditem/:id' element={<EditFoodItem />} />
        <Route path='/category/:categoryId' element={<FoodItems />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail/>}/>
        <Route path='/profile' element={<Profile />} />
        {/* <Route path='/nav'element={<NavbarComponent />} /> */}
      

      </Routes>
    </Router>

   
  );
}

export default AppRoutes;

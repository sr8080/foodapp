import express from 'express';
import {getUserAddresses,addAddress,getFoodItemsByRestaurants, registerUser,verifyOtp,googleRegister,login,fetchfoodlist,fetchrestaurant,addToCart,getCartItems,reportRestaurant,clearCart,removeCartItem,getCartItemsByUserId,getFoodItemById,getFoodItemsByCategory,getRestaurantById,createOrder,saveOrder} from '../controllers/Usercontroller';
import {getRestaurants}from '../controllers/AdminController'
import authenticateJWT from '../middlewares/authmiddleware';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/verify-otp',verifyOtp)
router.post('/googlesignup',googleRegister)
router.post('/login',login)
router.get('/restaurants',authenticateJWT,getRestaurants)
router.get('/foodlist/:id',authenticateJWT,fetchfoodlist)
router.post('/addtocart',authenticateJWT,addToCart)
router.get('/usercart',authenticateJWT, getCartItemsByUserId)
router.get('/fooditemid',authenticateJWT, getFoodItemById)
router.get('/fooditem',authenticateJWT, getFoodItemsByCategory)
router.get('/fooditems',authenticateJWT, getFoodItemsByRestaurants);
router.get('/restaurant/:id',authenticateJWT, getRestaurantById);
router.delete('/clearCart', authenticateJWT,clearCart);
router.delete('/removeItem',authenticateJWT, removeCartItem)

router.get('/getrestaurant/:id',authenticateJWT,fetchrestaurant)
router.post('/report/:id',authenticateJWT,reportRestaurant)

router.get('/user/:userId',  getUserAddresses);


router.post('/addaddress',  addAddress);
router.get('/addresses/:id', getUserAddresses);
router.post('/createOrder',createOrder)
router.post('/saveOrder',saveOrder)



export default router;
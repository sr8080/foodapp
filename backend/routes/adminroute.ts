import express from 'express';
import {adminlogin,getUsers,blockUnblockUser,getRestaurants,blockUnblockRestaurant,getDeliveryperson,blockUnblockDeliveryPerson} from '../controllers/AdminController'
import {registerRestaurant} from '../controllers/RestaurantController'
import {registerDeliveryPerson} from '../controllers/DeliveryPersonController'
import authenticateJWT from '../middlewares/authmiddleware';
const router = express.Router();

router.post('/adminlogin',adminlogin)
router.get('/users',authenticateJWT,getUsers)
router.put('/users/:id/block',authenticateJWT,blockUnblockUser)
router.get('/restaurants',authenticateJWT,getRestaurants)
router.put('/restaurant/:id/block',authenticateJWT,blockUnblockRestaurant)
router.get('/deliverypersons',authenticateJWT,getDeliveryperson)
router.put('/deliveryPerson/:id/block',authenticateJWT,blockUnblockDeliveryPerson)
router.post('/restaurantsignup',authenticateJWT,registerRestaurant)
router.post('/deliverypersonsignup',authenticateJWT,registerDeliveryPerson)

export default router;
import express from 'express';
import {restaurantlogin,addCategory,addCuisine,getCategories,getCuisine,addFoodItem,Deletecatagory,getRestaurantDetails,Deletecuisine,getFooditem,getFoodItemById,updateFoodItemById} from '../controllers/RestaurantController'
import authenticateJWT from '../middlewares/authmiddleware';
const router = express.Router();
router.post('/restaurantlogin',restaurantlogin)
router.post('/addcategory',authenticateJWT,addCategory)
router.post('/addcuisine',authenticateJWT,addCuisine)
router.post('/addfooditem',authenticateJWT,addFoodItem)
router.get('/categories',authenticateJWT,getCategories)
router.get('/cuisine',authenticateJWT,getCuisine)
router.delete('/catagory/:id',authenticateJWT,Deletecatagory)
router.delete('/cuisine/:id',authenticateJWT,Deletecuisine)
router.get('/fooditem/:restaurantId',authenticateJWT,getFooditem)
router.get('/fetchfoodItems/:id',authenticateJWT,getFoodItemById)
router.put('/updatefoodItems/:id',authenticateJWT,updateFoodItemById)

router.get('/restaurantdetails/:id',authenticateJWT, getRestaurantDetails);

router.post('/addfooditem',addFoodItem)

export default router
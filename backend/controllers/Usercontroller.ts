import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import User, { IUser } from '../models/userModel';
import jwt, { SignOptions } from 'jsonwebtoken';
import { sendEmail } from '../services/emailservices'; 
import multer, { StorageEngine, FileFilterCallback } from 'multer';
import path from 'path';

import Food from '../models/fooditemModel'
import Cart,{ ICart}  from '../models/cartModel'
import Restaurant from '../models/restaurantModel';
import Address from '../models/addressModel';
import Order from '../models/orderModel';
import mongoose from 'mongoose';
import Razorpay from 'razorpay';

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, path.join(__dirname, '../uploads/')); 
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, `${Date.now()}-${file.originalname}`); 
  }
});


const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true); 
  } else {
      cb(null, false); 
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});



const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
};

let registrationData: any;
let storedOtp: string | undefined;

export const registerUser = [
  
  upload.single('avatar'),
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, phoneNumber } = req.body;
    const avatar = req.file ? req.file.filename : undefined;
    console.log(avatar,"avvvvvvvvvv")

    try {
      const userExists: IUser | null = await User.findOne({ email });
      if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

    
      registrationData = {
        name,
        email,
        phoneNumber,
        password,
        avatar: avatar|| 'No avatar provided',
      };

    
      const otp = generateOTP();
      storedOtp = otp;
      await sendEmail(
        email,
        'Your OTP for Registration',
        `Your OTP for registration is ${otp}. It will expire in 10 minutes.`
      );

      res.status(201).json({
        message: 'User registered. Please verify your OTP sent to your email.',
      });
    } catch (error) {
      res.status(400).json({ message: 'Invalid user data' });
    }
  },
];

export const googleRegister = [
  upload.single('avatar'),
  async (req: Request, res: Response): Promise<void> => {
    const { name, email } = req.body;

    try {
      const userExists: IUser | null = await User.findOne({ email });
      if (userExists) {
        res.status(200).json({
          message: 'Login successful',
          userId: userExists._id.toHexString(),
        });
      } else {
        res.status(400).json({ message: 'Email not registered' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Invalid user data' });
    }
  },
];

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Email not registered' });
      return;
    }

    if (user.password && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user._id.toString(), email: user.email, isAdmin: user.isAdmin },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
  
      // Send back response
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          phoneNumber: user.phoneNumber,
          avatar: user.avatar,
          isAdmin: user.isAdmin,
        },
        token,
      });
    } else {
      res.status(400).json({ message: 'Wrong password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  // const { receivedOtp } = req.body;
  const {  receivedOtp} = req.body;
  console.log(receivedOtp,"recived otp")
console.log(storedOtp,"stord otp")
  try {
    if (receivedOtp === storedOtp) {
      const hashedPassword = await bcrypt.hash(registrationData.password, 10);

      const user: IUser = await User.create({
        ...registrationData,
        password: hashedPassword,
        isAdmin: false,
        isBlocked: false,
        isVerified: true,
      });

      res.status(201).json({
        message: 'User registered successfully',
        userId: user._id.toHexString(),
      });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const fetchfoodlist = async (req: Request, res: Response): Promise<void> => {
  try {

    console.log('enterrrrffff')
    const { id } = req.params;
    console.log( req.params,'paramssssssff')

   
    const food = await Food.find({restaurant:id});

    console.log(food,'yesssss')

    

    res.status(200).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the food item' });
  }
};


export const fetchrestaurant = async (req: Request, res: Response): Promise<void> => {
  try {

    console.log('enterresstidf')
    const { id } = req.params;
    console.log( req.params,'paassf')

    
    const restaurant = await Restaurant.findById(id);

    console.log(restaurant,'yesssssrestoo')

    

    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the food item' });
  }
};


// export const addToCart = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { foodItemId, userId, quantity } = req.body;

    
//     const foodItemObjectId = new mongoose.Types.ObjectId(foodItemId);
//     const userObjectId = new mongoose.Types.ObjectId(userId);

   
//     const foodItem = await Food.findById(foodItemObjectId);
//     if (!foodItem) {
//       res.status(404).json({ message: 'Food item not found' });
//       return;
//     }

   
//     let cart = await Cart.findOne({ user: userObjectId });

//     if (!cart) {
//       cart = new Cart({
//         user: userObjectId,
//         items: [],
//         totalPrice: 0,
//       });
//     }

   
//     const itemIndex = cart.items.findIndex(item => item.foodItem.toString() === foodItemObjectId.toString());

//     if (itemIndex > -1) {
     
//       cart.items[itemIndex].quantity += quantity;
//       cart.items[itemIndex].price = foodItem.price; 
//     } else {
     
//       const newItem = {
//         foodItem: foodItemObjectId,
//         quantity,
//         price: foodItem.price,
//       };

//       cart.items.push(newItem as any); 
//     }

//     // Update total price
//     cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

   
//     await cart.save();

//     res.status(200).json(cart);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred while adding the item to the cart' });
//   }
// };


export const getCartItems = async (req: Request, res: Response): Promise<void> => {
const userId=req.query.userId as string
  try {
    
    
console.log(userId,"uid cart")
   
    const cart = await Cart.findOne({ user: userId })
console.log(cart,"cart data")
    if (!cart) {
      res.status(404).json({ message: 'Cart not found for this user' });
      return;
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// export const getCartItemsByUserId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
//   const userId = req.query.userId as string; 

//   try {
//     if (!userId) {
//       return res.status(400).json({ message: 'User ID is required' });
//     }
//     const cart = await Cart.findOne({user: userId })

    
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     return res.json({ items: cart.items });
//   } catch (error) {
//     console.error('Error fetching cart items:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const getFoodItemById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
//   const fooditemId = req.query.foodItemId as string; 
//   const { id } = req.params; 
//   console.log(fooditemId,'fooooditemidddd');
//   console.log(id,'iiiiiiiiiiiiiiiidddddddddddddddddddd')

//   try {
    
//     if (!fooditemId) {
//       return res.status(400).json({ message: 'Food item ID is required' });
//     }

   
//     const foodItem = await Food.findById(fooditemId);
//     console.log(foodItem,'foooooooooooggggggggggggggg')

//     if (!foodItem) {
//       return res.status(404).json({ message: 'Food item not found' });
//     }

//     return res.json(foodItem);
//   } catch (error) {
//     console.error('Error fetching food item:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };


// neww

export const getFoodItemsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
      const { category } = req.query;
      console.log(category,'category') 

      if (!category) {
          res.status(400).json({ message: 'Category ID is required' });
          return;
      }

      const foodItem = await Food.find({ category }); 
console.log(foodItem,'fooditem')
      res.status(200).json(foodItem); 
  } catch (error) {
      res.status(500).json({ message: 'Failed to fetch food items' });
  }
};

export const getFoodItemsByRestaurants = async (req: Request, res: Response) => {
  try {
    const { restaurant } = req.query;
    
    // Pagination parameters from query
    const page = parseInt(req.query.page as string) || 1; // Default to page 1
    const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit; // Calculate the number of items to skip

    // Fetch the food items with pagination
    const foodItems = await Food.find({ restaurant })
      .skip(skip)
      .limit(limit);

    // Count the total number of items for this restaurant (for frontend reference)
    const totalItems = await Food.countDocuments({ restaurant });

    res.json({
      foodItems,
      pagination: {
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const getRestaurantById = async (req: Request, res: Response) => {
  console.log("rsto by id")
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const getFoodItemsByRestaurant = async (req: Request, res: Response) => {
  try {
    const foodItems = await Food.find({ restaurant: req.query.restaurant });
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// cart

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  console.log('helloo')
  try {
    const { foodItemId, userId, quantity } = req.body;
    console.log(foodItemId,userId,'bbbbbbbbbbbbboooooooooooth')
    
console.log(quantity,"qquii004")
  
    // const foodItemObjectId = new mongoose.Types.ObjectId(foodItemId);
    // const userObjectId = new mongoose.Types.ObjectId(userId);


    const foodItem = await Food.findById(foodItemId);
    console.log('fooodddd')
    if (!foodItem) {
      res.status(404).json({ message: 'Food item not found' });
      return;
    }

 
    let cart = await Cart.findOne({ user: userId});
    console.log('carrtttt')
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
        totalPrice: 0,
      });
    }

    const itemIndex = cart.items.findIndex(item => item.foodItem.toString() === foodItemId._id.toString());
console.log(itemIndex,"item index")
console.log(foodItemId.toString(),"fid 001")
console.log(foodItemId._id,"fid 002")
    if (itemIndex > -1) {
  
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].price = foodItem.price; 
    } else {
      
      const newItem = {
        foodItem: foodItem,
        quantity,
        price: foodItem.price,
      };

      cart.items.push(newItem as any);
    }

   
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

   
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while adding the item to the cart' });
  }
};


export const getCartItemsByUserId = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const userId = req.query.userId as string; 

  try {
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const cart = await Cart.findOne({user: userId })

    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.json({ items: cart.items });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFoodItemById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const fooditemId = req.query.foodItemId as string; 
  const { id } = req.params; 
  console.log(fooditemId,'fooooditemidddd');
  

  try {
   
    if (!fooditemId) {
      return res.status(400).json({ message: 'Food item ID is required' });
    }

    
    const foodItem = await Food.findById(fooditemId);
    console.log(foodItem,'foooooooooooggggggggggggggg')

    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    return res.json(foodItem);
  } catch (error) {
    console.error('Error fetching food item:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const removeCartItem = async (req: Request, res: Response): Promise<Response> => {
  const userId  =  req.query.userId as string;
  const itemId=req.query.itemId as string;
console.log('entered')
console.log(userId,'userid')
  try {
    // Find the cart for the given user
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the item from the cart by filtering out the specific item
    cart.items = cart.items.filter((item) => item.foodItem.toString() !== itemId);

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Clear all items from cart
export const clearCart = async (req: Request, res: Response): Promise<Response> => {
  const  userId  = req.query.userId as string;

  try {
    // Find the cart for the given user
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    // Clear the items in the cart
    cart.items = [];

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



export const updateCartItem = async (req: Request, res: Response) => {
  const { userId, foodItemId, newQuantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(foodItemId)) {
    return res.status(400).json({ message: 'Invalid user or food item ID' });
  }

  try {
    // Fetch the food item to check stock availability
    const foodItem = await Food.findById(foodItemId);

    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    // Check if the requested quantity exceeds the available stock
    if (newQuantity > foodItem.quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Fetch the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the cart item to update
    const cartItem = cart.items.find(item => item.foodItem.toString() === foodItemId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Food item not found in cart' });
    }

    // Update the cart item quantity and price
    const previousQuantity = cartItem.quantity;
    const quantityDifference = newQuantity - previousQuantity;
    cartItem.quantity = newQuantity;
    cartItem.price = foodItem.price * newQuantity;

    // Update the total cart price
    cart.totalPrice += foodItem.price * quantityDifference;

    // Save the updated cart
    await cart.save();

    // Decrease the stock quantity of the food item
    foodItem.quantity -= quantityDifference;
    await foodItem.save();

    res.json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
};


export const reportRestaurant = async (req: Request, res: Response) => {
  const restaurantId = req.params.id;
  const { userId } = req.body;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Add the report
    restaurant.reports.push({ userId, reportedAt: new Date() });
    await restaurant.save();

    return res.status(200).json({ message: 'Restaurant reported successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to report restaurant', error });
  }
};
// profile.............................................
export const getUserAddresses = async (req: Request, res: Response) => {
  console.log("user address")
  try {
    const userId = req.params.id;
    console.log(req.query,"qu")
    console.log(req.body,"body")
    console.log(userId,"uuid")

    // Check if userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Find all addresses that belong to the user
    const addresses = await Address.find({ userId });
    console.log(addresses,"address 009")

    // Check if addresses were found
    if (!addresses || addresses.length === 0) {
      return res.status(404).json({ message: 'No addresses found for this user.' });
    }

    // Send the addresses as a response
    res.status(200).json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching addresses.' });
  }
};

// Controller function to add a new address (optional, for future use)
// export const addAddress = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const { street, city, state, postalCode, country, isDefault } = req.body;

//     // Check if userId is valid
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: 'Invalid user ID' });
//     }

//     // Create a new address
//     const newAddress = new Address({
//       userId,
//       street,
//       city,
//       state,
//       postalCode,
//       country,
//       isDefault,
//     });

//     // Save the address to the database
//     const savedAddress = await newAddress.save();

//     res.status(201).json(savedAddress);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error adding address.' });
//   }
// };
// Check out..............................................

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,  // Store your keys in environment variables
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

// Type for order creation request body
interface OrderRequestBody {
  amount: number;
  currency: string;
  orderData: {
    user: string;   // Adjust type according to your user model
    address: string;
    foodItems: any[]; // Adjust according to food item model
    totalAmount: number;
    paymentMethod: string;
  };
}

export const createOrder = async (req: Request, res: Response) => {
  console.log('Starting createOrder function');

  try {
    // Check if the request body has orderData (for Razorpay) or direct fields (for COD)
    const isCOD = req.body.paymentMethod === 'COD';
    const { amount, currency, orderData }: OrderRequestBody = isCOD
      ? { amount: req.body.totalAmount * 100, currency: 'INR', orderData: req.body }
      : req.body;

    console.log('Received request body:', req.body);

    // Destructure orderData or handle directly for COD
    const { user, address, foodItems, totalAmount, paymentMethod } = orderData;

    console.log('Order data extracted:', {
      user,
      address,
      foodItems,
      totalAmount,
      paymentMethod,
    });

    if (!amount || !currency) {
      console.log('Missing amount or currency:', { amount, currency });
      return res.status(400).json({
        success: false,
        message: 'Amount and currency are required to create an order',
      });
    }

    // If payment method is COD, skip Razorpay API and directly respond
    if (paymentMethod === 'COD') {
      console.log('Processing COD order');
      return res.status(201).json({
        success: true,
        orderId: 'COD-' + new Date().getTime(), // Create a mock orderId for COD
        amount: totalAmount,
        currency: 'INR',
        user,
        address,
        foodItems,
        totalAmount,
        paymentMethod,
        
      });
    }

    // If Razorpay, create order with Razorpay API
    console.log('Creating order with Razorpay API with options:', { amount, currency });
    const order = await razorpay.orders.create({ amount, currency });

    console.log('Order created successfully:', order);

    res.status(201).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      user,
      address,
      foodItems,
      totalAmount,
      paymentMethod,
    });

    console.log('Response sent successfully to the client');
  } catch (error) {
    console.error('Error occurred during order creation:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to create the order',
      error: 'An error occurred',
    });

    console.log('Error response sent to the client');
  }
};

// Function to save order after successful payment
export const saveOrder = async (req: Request, res: Response) => {
  console.log('Starting saveOrder function');
  
  const { paymentId, orderId, user, address, foodItems, totalAmount, paymentMethod } = req.body;

  try {
    // Save the order based on the payment method (COD or Razorpay)
    const newOrder = new Order({
      user,
      address,
      foodItems: foodItems.map((item: any) => ({
        foodItem: item.id,
        quantity: item.quantity,
      })),
      totalAmount,
      paymentMethod,
      paymentId: paymentMethod === 'cod' ? null : paymentId, // No paymentId for COD
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid', // Set status as pending for COD
      orderStatus: 'placed',
    });

    const savedOrder = await newOrder.save();
    console.log('Order saved successfully:', savedOrder);

    res.status(201).json({
      success: true,
      order: savedOrder,
    });
  } catch (error) {
    console.error('Error saving order:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to save the order',
    });
  }
};



export const getOrderDetails = async (req: Request, res: Response) => {
  const { paymentId } = req.params;

  console.log(`Received request to fetch order details for Payment ID: ${paymentId}`);

  try {
   
    console.log('Searching for the order in the database...');

    
    const order = await Order.findOne({ paymentId })
      .populate('address') 
      .populate('foodItems');
      
    if (!order) {
      console.log(`Order with Payment ID ${paymentId} not found.`);
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log(`Order found: ${JSON.stringify(order)}`);

    // Return the order details
    console.log(`Returning order details for Payment ID: ${paymentId}`);
    return res.status(200).json(order);
  } catch (error) {
    // Log the error in case something goes wrong
    console.error(`Error occurred while fetching order details for Payment ID: ${paymentId}`);
    console.error('Error details:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// address//..............

export const addAddress = async (req: Request, res: Response) => {
  console.log('add address 011')
  const { street, city, state, postalCode, country, isDefault, userId } = req.body;
  console.log(street,"street")
  console.log(userId,"uid in ad 007")
  try {
    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // If isDefault is true, set all other addresses for the user to false
    if (isDefault) {
      await Address.updateMany({ userId }, { isDefault: false });
    }

    // Create new address
    const newAddress = new Address({
      userId,
      street,
      city,
      state,
      postalCode,
      country,
      isDefault,
    });

    // Save the address in the database
    const savedAddress = await newAddress.save();
    res.status(201).json({ message: 'Address added successfully', address: savedAddress });

  } catch (error) {
    res.status(500).json({ message: 'Error adding address', error });
  }
};
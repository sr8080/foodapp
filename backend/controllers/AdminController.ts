import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';
import Restaurant from '../models/restaurantModel';
import DeliveryPerson from '../models/deliverypersonModel';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
export const adminlogin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    try {
      const user: IUser | null = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: 'Email not registered' });
        return;
      }
  
      if (user.password && await bcrypt.compare(password, user.password) ) {
        if(user.isAdmin=true){
          const token = jwt.sign(
            { userId: user._id.toHexString(), email: user.email },
            'your_secret_key',
            { expiresIn: '1h' } as SignOptions
          );
            res.status(200).json({
                message: 'Login successful',
                userId: user._id.toHexString(),
                token
                
              });
        }
        
        
      } else {
        res.status(400).json({ message: 'Wrong password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const getUsers = async (req: Request, res: Response): Promise<void> => {
    console.log("b1")
    try {
        const users = await User.find({});
        console.log("b2")
        console.log(users,"back user")
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

export const blockUnblockUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(1001)
    const { id } = req.params;
    const { isBlocked } = req.body; // Expecting a boolean value for isBlocked
    console.log(id,"idddddddddd")
    console.log(isBlocked,"isblocked")
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Update the user's isBlocked status
    user.isBlocked = isBlocked;

    await user.save();

    res.status(200).json({ message: `User has been ${user.isBlocked ? 'blocked' : 'unblocked'}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the user status' });
  }
};
// restaurantfetch

export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
      const restaurants = await Restaurant.find({});
      res.json(restaurants);
      console.log(restaurants,'helllloooooorestttt')
  } catch (error) {
      res.status(500).json({ message: 'Failed to fetch restaurants' });
  }
};
export const blockUnblockRestaurant = async (req: Request, res: Response): Promise<void> => {
try {
  console.log(1001)
  const { id } = req.params;
  const { isBlocked } = req.body; 
  console.log(id,"idddddddddd")
  console.log(isBlocked,"isblocked")
  // Find the user by ID
  const restaurant = await Restaurant.findById(id);

  if (!restaurant) {
    res.status(404).json({ message: 'Restaurant not found' });
    return;
  }


  restaurant.isBlocked = isBlocked;

  await restaurant.save();

  res.status(200).json({ message: `Restaurant has been ${restaurant.isBlocked ? 'blocked' : 'unblocked'}` });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'An error occurred while updating the user status' });
}
};

// delivery boy

export const getDeliveryperson = async (req: Request, res: Response): Promise<void> => {
  try {
      const deliveryPerson  = await DeliveryPerson .find({});
      res.json(deliveryPerson );
      
  } catch (error) {
      res.status(500).json({ message: 'Failed to fetch restaurants' });
  }
};
export const blockUnblockDeliveryPerson = async (req: Request, res: Response): Promise<void> => {
  try {
     console.log("boy3")
    const { id } = req.params;
    const { isblocked } = req.body; 
    console.log(isblocked,"blocked")

    // Find the delivery person by ID
    const deliveryPerson = await DeliveryPerson.findById(id);
    console.log(deliveryPerson,"deliveryperson")
    console.log(deliveryPerson?.isBlocked,"deliveryperson")

    if (!deliveryPerson) {
      res.status(404).json({ message: 'Delivery person not found' });
      return;
    }

    // Update the delivery person’s isblocked status
    deliveryPerson.isBlocked = isblocked;

    await deliveryPerson.save();
    console.log("boy4")

    res.status(200).json({ message: `Delivery person has been ${deliveryPerson.isBlocked ? 'blocked' : 'unblocked'}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the delivery person status' });
  }
};

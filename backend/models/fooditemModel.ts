import mongoose, { Document, Schema } from 'mongoose';

export interface IFoodItem extends Document {
  name: string;
  price: number;
  quantity: number;
  category: mongoose.Types.ObjectId;
  cuisine: mongoose.Types.ObjectId;
  image: string; // Base64 encoded string or path to the image
  restaurant: mongoose.Types.ObjectId;
  isVeg: string; // Changed to a string, either "vegetarian" or "non-vegetarian"
  foodType: 'Veg' | 'Non-Veg';

}

const FoodItemSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  cuisine: {
    type: mongoose.Types.ObjectId,
    ref: 'Cuisine',
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  foodType: {
    type: String,
    enum: ['Veg', 'Non-Veg'], // Only allows these two values
    required: true,
  },
});

const FoodItem = mongoose.model<IFoodItem>('FoodItem', FoodItemSchema);

export default FoodItem;

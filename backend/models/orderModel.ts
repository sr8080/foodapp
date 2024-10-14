import { Schema, model, Types } from 'mongoose';

interface IOrder extends Document {
  user: Types.ObjectId;
  address: Types.ObjectId;
  foodItems: { foodItem: Types.ObjectId; quantity: number }[];
  totalAmount: number;
  paymentMethod: string;
  paymentId: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
  foodItems: [
    {
      foodItem: { type: Schema.Types.ObjectId, ref: 'FoodItem', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentId: { type: String, },
  paymentStatus: { type: String, default: 'pending' },
  orderStatus: { type: String, default: 'placed' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = model<IOrder>('Order', OrderSchema);

export default Order;
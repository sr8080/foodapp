import { Document, model, Schema, Types } from 'mongoose';


export interface IAddress extends Document {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean; 
  userId: Types.ObjectId; 
}


const addressSchema = new Schema<IAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,  
  },
  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'User',  
    required: true,
  },
});

const Address = model<IAddress>('Address', addressSchema);

export default Address;

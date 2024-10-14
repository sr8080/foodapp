import { Document, model, Schema, Types } from 'mongoose';


export interface ICategory extends Document {
  _id: Types.ObjectId; 
  name: string;
 description:string;
  avatar?: string; 
 
}


const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  description:{
    type:String
  },
  avatar: {
    type: String, 
  },
  
});


const Category = model<ICategory>('Category', categorySchema);

export default Category;  

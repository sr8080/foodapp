import { Schema, model, Document, Types } from 'mongoose';

// Define an interface for Message Document
interface IMessage extends Document {
  conversationId: Types.ObjectId;
  senderId: Types.ObjectId; // Can be either User or Restaurant
  message: string;
  timestamp: Date;
}

// Define the schema with types
const messageSchema = new Schema<IMessage>({
  conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
  senderId: { type: Schema.Types.ObjectId, required: true }, // Sender could be User or Restaurant
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Create the model from the schema
const Message = model<IMessage>('Message', messageSchema);

export default Message;

import mongoose, { Document, Schema } from 'mongoose';

// Define an interface representing a Todo document, extending Mongoose's Document interface
export interface ITodo extends Document {
  title: string;
  description: string;
  dueDate: Date;
  isCompleted: boolean;
  user: mongoose.Types.ObjectId;
}

// Define the schema for the Todo model
const todoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  isCompleted: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

// Export the Todo model, using the ITodo interface and todoSchema
export default mongoose.model<ITodo>('Todo', todoSchema);

import bcrypt from 'bcryptjs';
import mongoose, { Document, Schema } from 'mongoose';

// Interface for the User document, extending the Mongoose Document
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  validatePassword(userPassword: string): Promise<boolean>;
}

// Define the User schema
const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

// Pre-save middleware to hash the password before saving the document
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Generate a salt and hash the password before saving it
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to validate the password during login or comparison
UserSchema.methods.validatePassword = async function (userPassword: string): Promise<boolean> {
  return bcrypt.compare(userPassword, this.password);
};

// Export the User model with the IUser interface attached
export default mongoose.model<IUser>('User', UserSchema);

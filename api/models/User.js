import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    country: {
      type: String,
      default: 'Serbia',
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      default: 'Belgrade',
    },
    mobile: {
      type: String,
    },
    address: { type: String },
    profile: { type: String },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;

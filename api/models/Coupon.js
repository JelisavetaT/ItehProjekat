import mongoose from 'mongoose';
const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    used: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      min: 5,
      max: 20,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Coupon', CouponSchema);

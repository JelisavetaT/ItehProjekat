import mongoose from 'mongoose';
const ReservationSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    hotel: {
      type: String,
      required: true,
    },
    rooms: {
      type: [String],
      required: true,
    },
    guests: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    genCoupon: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Reservation', ReservationSchema);

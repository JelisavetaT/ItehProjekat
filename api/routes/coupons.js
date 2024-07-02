import express from 'express';
import {
  createCoupon,
  getCoupon,
  getCouponById,
  updateCoupon,
} from '../controllers/coupon.js';

const router = express.Router();

// create
router.post('/', createCoupon);

// update (use coupon)
router.put('/:code', updateCoupon);

// get coupon
router.get('/:code', getCoupon);
router.get('/find/:id', getCouponById);

export default router;

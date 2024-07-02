import Coupon from '../models/Coupon.js';

export const createCoupon = async (req, res, next) => {
  const newCoupon = new Coupon(req.body);

  try {
    const saveCoupon = await newCoupon.save();
    res.status(200).json(saveCoupon);
  } catch (err) {
    next(err);
  }
};

export const updateCoupon = async (req, res, next) => {
  try {
    const updatedCoupon = await Coupon.findOneAndUpdate(
      { code: req.params.code },
      { used: true },
      { new: true }
    );
    res.status(200).json(updatedCoupon);
  } catch (err) {
    next(err);
  }
};

export const getCoupon = async (req, res, next) => {
  const coupon = await Coupon.findOne({
    code: req.params.code,
  });
  res.status(200).json(coupon);
};

export const getCouponById = async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    res.status(200).json(coupon);
  } catch (err) {
    next(err);
  }
};

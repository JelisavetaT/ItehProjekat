import Reservation from '../models/Reservation.js';

export const createReservation = async (req, res, next) => {
  try {
    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();
    res.status(200).json(savedReservation);
  } catch (err) {
    next(err);
  }
};

export const deleteReservation = async (req, res, next) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json('Reservation has been deleted.');
  } catch (err) {
    next(err);
  }
};

export const getReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
};

export const getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};

export const getUsersReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ user: req.params.user });
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};

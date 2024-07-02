import express from 'express';
import {
  createReservation,
  deleteReservation,
  getReservation,
  getReservations,
  getUsersReservations,
} from '../controllers/reservation.js';

const router = express.Router();

// create
router.post('/', createReservation);

// delete
router.delete('/:id', deleteReservation);

// get
router.get('/find/:id', getReservation);

// get all
router.get('/', getReservations);
router.get('/:user', getUsersReservations);

export default router;

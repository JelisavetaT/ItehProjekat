import express from 'express';
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from '../controllers/room.js';

const router = express.Router();

router.post('/:hotelid', createRoom);

router.put('/availability/:id', updateRoomAvailability);
router.put('/:id', updateRoom);

router.delete('/:id/:hotelid', deleteRoom);

router.get('/:id', getRoom);

router.get('/', getRooms);

export default router;

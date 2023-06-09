import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { createHotel, deleteHotel, getAllHotels, getHotel, updateHotel, countByCity, countByType } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { getAllRooms } from "../controllers/room.js";
const router = express.Router();

router.post("/", verifyAdmin, createHotel);

router.put("/:id",verifyAdmin, updateHotel)

router.delete("/:id",verifyAdmin, deleteHotel)

router.get("/find/:id", getHotel)

router.get("/", getAllHotels)

router.get("/countByCity", countByCity)

router.get("/countByType", countByType)

router.get("/room/:id", getAllRooms)

export default router;
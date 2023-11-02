import express from "express";
const router=express.Router();
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { countByCity,countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getallHotel, updateHotel } from "../controllers/hotelC.js";
import {  verifyUser } from "../utils/verifyToken.js";


//CREATE=use POST
router.post("/", verifyUser,createHotel);

//UPDATE=use PUT
router.put("/:id", verifyUser,updateHotel);

//DELETE=use DELETE
router.delete("/:id", verifyUser,deleteHotel);

//GET hotel by id INFO=use GET
router.get("/find/:id",getHotel);

//GET all hotels INFO=use GET
router.get("/",getallHotel);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

router.get("/room/:id", getHotelRooms);






export default router;
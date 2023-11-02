import express from "express";
const router=express.Router();
import { createRoom, deleteRoom, getRoom, getallRoom, updateRoom, updateRoomAvailability } from "../controllers/roomC.js";
import { verifyUser } from "../utils/verifyToken.js";


//CREATE=use POST
router.post("/:hotelid", verifyUser,createRoom);

//UPDATE=use PUT
router.put("/:id", verifyUser,updateRoom);
router.put("/availability/:id", updateRoomAvailability);


//DELETE=use DELETE
router.delete("/:id/:hotelid", verifyUser,deleteRoom);

//GET Room by id INFO=use GET
router.get("/:id",getRoom);

//GET all Rooms INFO=use GET
router.get("/",getallRoom);





export default router;
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            // Updates the corresponding hotel document by pushing the new room's ID into the 'rooms' array
            await Hotel.findByIdAndUpdate(hotelId, {
                // push adds the room ID to the 'rooms' array in the hotel document
                $push: { rooms: savedRoom._id }
            })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (err) {
        next(err)
    }
};

export const updateRoom = async (req, res, next) => {
    //UPDATE=use PUT
        try{
            const updateRoom=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            res.status(200).json(updateRoom);
    
        }catch(err){
            next(err);
        }
    };
    export const updateRoomAvailability = async (req, res, next) => {
        try {
          await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
              $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
              },
            }
          );
          res.status(200).json("Room status has been updated.");
        } catch (err) {
          next(err);
        }
      };
    
    
    export const deleteRoom = async (req, res, next) => {
        const hotelId = req.params.hotelid;

    //DELETE=use DELETE
        try{
            await Room.findByIdAndDelete(req.params.id);
            try {
                // Updates the corresponding hotel document by pushing the new room's ID into the 'rooms' array
                await Hotel.findByIdAndUpdate(hotelId, {
                    // pull removes the room ID to the 'rooms' array in the hotel document
                    $pull: { rooms:req.params.id}
                })
            } catch (err) {
                next(err)
            }
    
            res.status(200).json("Room has been deleted");
    
        }catch(err){
            next(err);
        }
    };
    
    export const getRoom = async (req, res, next) => {
    //GET Room by id INFO=use GET
        try{
            const room=await Room.findById(req.params.id);
            res.status(200).json(room);
    
        }catch(err){
            next(err);
        }
    };
    
    export const getallRoom = async (req, res, next) => {
    //GET all Rooms INFO=use GET
    
        // const failed=true;
        // if(failed){
        //     return next(createError(401,"you are not authenticated"));
        // }
            try{
                const rooms=await Room.find();
                res.status(200).json(rooms);
            }catch(err){
                next(err);
            }
        };
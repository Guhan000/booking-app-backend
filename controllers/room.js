import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';
import { createError } from '../utils/error.js';

export const createRoom = async (req,res,next) => {
    const hotelId = req.params.hotelid;
    const newRooms = new Room(req.body);

    try{
        const savedRoom = await newRooms.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: {rooms: savedRoom._id},
            });
        }catch(err){
            next(err);
        }
        res.status(200).json(savedRoom);
    }catch(err){
        next(err);
    }
}


export const updateRoom = async (req,res,next) => {
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
        res.status(200).json(updatedRoom);
    }catch(err){
        next(err);
    }
}

export const updateRoomAvailability = async (req,res,next) => {
    const {userId} = req.params.userId;
    try{
        await Room.updateOne({"roomNumbers._id":req.params.id}, {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            }
        })
        await Room.updateOne({
            $push: {
                "user": userId
            }
        });
        res.status(200).json("Room status has been updated!");
    }catch(err){
        next(err);
    }
}

export const deleteRoom = async (req,res,next) => {
    const hotelid = req.params.hotelid;
    try{
        await Room.findByIdAndDelete(req.params.id);
        try{
            await Hotel.findByIdAndUpdate(hotelid, {
                $pull: {rooms: req.params.id},
            });
        }catch(err){
            next(err);
        }
        res.status(200).json("Room has been deleted!!");
    }catch(err){
        next(err);
    }
}

export const getRoom = async (req,res,next) => {
    try{
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    }catch(err){
        next(err);
    }
}

export const getAllRooms = async (req,res,next) => {
    try{
        const rooms = await Room.find();
        res.status(200).json(rooms);
    }catch(err){
        next(err);
    }
}

export const getAllRoomsByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Find the user and populate the selected rooms
        const user = await User.findById(userId).populate("rooms");

        res.status(200).json(user.rooms);
    } catch (err) {
        next(err);
    }
};
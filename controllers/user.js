import User from "../models/User.js";
import Room from "../models/Room.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!!");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getAllRoomsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Find the user and populate the selected rooms
    const user = await User.findById(userId).populate({
      path: "rooms",
      model: "Room"
    });

    const selectedRooms = user.rooms.filter(room => room.roomNumbers.some(roomNumber => roomNumber.user === userId));

    res.status(200).json(selectedRooms);
  } catch (err) {
    next(err);
  }
};


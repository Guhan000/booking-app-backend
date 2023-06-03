import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';

const app = express();
dotenv.config();

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb");
    } catch(error){
        console.log(error);
        throw error
        
    }
}

// middlewares

app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);
 
app.listen(8800, () => {
    connect();
    console.log("Connected to backend!");
})
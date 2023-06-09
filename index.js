import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

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
var allowlist = ['https://instant-booking.netlify.app']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }

// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            
//     optionSuccessStatus:200
// }
app.use(cors(corsOptionsDelegate));
app.use(express.static('build'))
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);

app.use((err,req,res,next) => {
    // res.header('Access-Control-Allow-Origin', '*');
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

app.listen(8800, () => {
    connect();
    console.log("Connected to backend!");
})
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = new express();
dotenv.config();

import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import cookieParser from "cookie-parser";
import cors from "cors";
app.use(cors());

import bodyParser from "body-parser";
app.use(bodyParser.json());


main().catch(err => console.log(err));

async function main() {
    //   await mongoose.connect(process.env.MONGO);
    await mongoose.connect("mongodb://127.0.0.1:27017/booking");

    console.log("connected to mongodb!!")
};

// mongoose.connection.on("disconnected",()=>{
//     console.log("mongoDB disconnected")
// });

// mongoose.connection.on("connected",()=>{
//     console.log("mongoDB connected")
// });


//middlewares
app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//middleware for error handling
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
});

app.listen(8800, () => {
    console.log("connected to backend!")
})

// mongodb://localhost:27017
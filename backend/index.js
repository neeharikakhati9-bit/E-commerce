import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();
const app = express(); //express used to initialize the server
app.use(express.json())
const PORT = process.env.PORT;
import jwt from "jsonwebtoken"

// import database connection function
import connectDB from "./conn/db.js";

// importing routes
import AuthRouter from "./routes/user.route.js"

app.use('/api/user', AuthRouter)
app.listen(PORT, () => { //listen is used to start the server
    connectDB()
  console.log(`Listening to port ${PORT}`);
});

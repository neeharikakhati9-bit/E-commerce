import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import cors from "cors"
dotenv.config();
const app = express(); //express used to initialize the server
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT;
import jwt from "jsonwebtoken"

// import database connection function
import connectDB from "./conn/db.js";

// importing routes
import AuthRouter from "./routes/user.route.js"
import Itemrouter from "./routes/item.routes.js"


app.use('/api/user', AuthRouter) 
app.use('/api/items',Itemrouter)
app.listen(PORT, () => { //listen is used to start the server
    connectDB()
  console.log(`Listening to port ${PORT}`);
});

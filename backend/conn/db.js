import mongoose from "mongoose";

async function connectDB() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Error connecting Database", err);
    });
}

export default connectDB
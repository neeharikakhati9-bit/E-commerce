import mongoose from "mongoose";

// create schema
const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["vehicle", "electronics", "cosmatics", "greocery"],
    },
    image: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
  },
  { timestamps: true },
);

const ItemModel = mongoose.model("item", ItemSchema);
export default ItemModel;

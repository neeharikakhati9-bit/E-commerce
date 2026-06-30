import ItemModel from "../models/item.model.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

export const addItem = async (req, res) => {
  try {
    const id = req.user;
    if (!id) {
      return res.status(400).json({
        message: "Unauthorized: User not found...",
      });
    }

    const { name, category, price, description } = req.body;

    const uploadedFiles = req.files?.image || req.files || [];
    const file = Array.isArray(uploadedFiles)
      ? uploadedFiles[0]
      : uploadedFiles;
    const parsedPrice = Number(price);
    const normalizedCategory = category?.toLowerCase();

    if (!(name && description && category && price)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({
        message: "Price must be a valid positive number",
      });
    }

    const reqCategories = ["vehicle", "electronics", "cosmatics", "greocery"];
    if (!reqCategories.includes(normalizedCategory)) {
      return res.status(400).json({
        message: "Invalid Category",
      });
    }

    let imageUrl = null;
    if (file) {
      imageUrl = await uploadToCloudinary(file.buffer, `items/${id}`);
    }

    if (!imageUrl) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const item = await ItemModel.findOne({
      seller: id,
      name,
      price: parsedPrice,
    });

    if (item) {
      item.quantity += 1;
      item.image = imageUrl;
      item.category = normalizedCategory;
      await item.save();
      return res.status(200).json({
        message: "item updated successfully",
        item,
      });
    }

    const newItem = await ItemModel.create({
      name,
      description,
      price: parsedPrice,
      category: normalizedCategory,
      image: imageUrl,
      seller: id,
    });

    return res.status(200).json({
      message: "item added successfully",
      item: newItem,
    });
  } catch (error) {
    console.log("Error in Add item controller", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// get items
export async function getItems(re, res) {
  try {
    const items = await ItemModel.find({$and: [
        {price: {$lt: 500000}},
        {price: {$gt: 100000}}
    ]})
    .populate("seller", "name email -_id");
    res.status(200).json({ items });
  } catch (error) {
    console.log("Error in get item controller: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

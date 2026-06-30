import express from "express";
import { addItem, getItems } from "../controllers/item.controller.js";
import { isAuth } from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/add-item", isAuth, upload.fields([{ name: "image", maxCount: 1 }]), addItem);
router.get("/get-items", getItems)

export default router;
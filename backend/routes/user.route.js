import express from "express";
import {
  changePassword,
  changePasswordByToken,
  checkMe,
  login,
  signup,
} from "../controllers/user.controller.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/change-password", changePassword);
router.get('/check-me',isAuth,  checkMe);
router.put('/change-password-token',isAuth, changePasswordByToken)

export default router;

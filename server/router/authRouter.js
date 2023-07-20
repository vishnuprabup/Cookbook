import express from "express";
import {
  logOutController,
  loginController,
  signupController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupController);
router.get("/logout", logOutController);

export default router;

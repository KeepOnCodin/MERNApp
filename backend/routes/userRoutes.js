import express from "express";
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";

const router = express.Router();


router.post("/auth", authUser);
router.post("/", registerUser);
router.post("/logout", logoutUser);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);

export default router;
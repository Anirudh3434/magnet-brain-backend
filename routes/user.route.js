import express from "express";
import { registerUser, loginUser, refreshAccessToken, getUsers , logoutUser } from "../controllers/user.controller.js";
 import {protect} from "../middleware/auth.middleware.js";
 

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.get("/get-all-user",protect, getUsers )
router.post("/logout",protect, logoutUser)

router.post("/auth-check", protect, (req, res) => {
    res.json({success: true, message: "Authenticated successfully" , user: req.user});
})


export default router;
import express from "express";
import { getUserProfile, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticatd from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout)
router.route("/profile").get(isAuthenticatd,getUserProfile);
router.route("/profile/update").put(isAuthenticatd,upload.single("profilePhoto"),updateProfile);

export default router;
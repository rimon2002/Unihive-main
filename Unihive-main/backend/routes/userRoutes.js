import express from "express";
import { signupUser } from "../controllers/userController.js";
import { loginUser } from "../controllers/userController.js";
import { logoutUser } from "../controllers/userController.js";
import { followUnFollowUser } from "../controllers/userController.js";
import { updateUser } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";
import { getUserProfile } from "../controllers/userController.js";
const router = express.Router();

router.get("/profile/:username", getUserProfile);

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser);
router.post("/update/:id", protectRoute, updateUser);

export default router;

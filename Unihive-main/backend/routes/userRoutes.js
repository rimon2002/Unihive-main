import express from "express";
import {
  followUnFollowUser,
  freezeAccount,
  getSuggestedUsers,
  getUserProfile, // Correctly imported
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from "../controllers/userController.js"; // Correctly import

import protectRoute from "../middlewares/protectRoute.js"; // Protect route middleware

const router = express.Router();

// Route for viewing a user's profile
router.get("/profile/:query", getUserProfile);

// Route for getting suggested users (only accessible by authenticated users)
router.get("/suggested", protectRoute, getSuggestedUsers);

// Route for user signup
router.post("/signup", signupUser);

// Route for user login
router.post("/login", loginUser);

// Route for logging out
router.post("/logout", logoutUser);

// Route for following/unfollowing a user (only accessible by authenticated users)
router.post("/follow/:id", protectRoute, followUnFollowUser);

// Route for updating user details (only accessible by authenticated users)
router.put("/update/:id", protectRoute, updateUser);

// Route for freezing the user account (only accessible by authenticated users)
router.put("/freeze", protectRoute, freezeAccount);

export default router;
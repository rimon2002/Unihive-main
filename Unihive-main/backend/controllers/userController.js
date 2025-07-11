import bcrypt from "bcryptjs";
import cloudinary from 'cloudinary';
import mongoose from "mongoose";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

// Predefined fixed values for studentId and studentPassword
const fixedStudentId = "id";  // Fixed Student ID
const fixedStudentPassword = "pass";  // Fixed Student Password

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password, studentId, studentPassword, role } = req.body;

    // Check if user already exists by email or username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Ensure the provided studentId and studentPassword match the fixed ones
    if (studentId !== fixedStudentId || studentPassword !== fixedStudentPassword) {
      return res.status(400).json({ error: "Invalid Student ID or Student Password" });
    }

    // Hash the regular password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Hash the student password
    const hashedStudentPassword = await bcrypt.hash(studentPassword, salt);

    // Set default role if none provided
    const userRole = role || "Student";

    // Create new user
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
      studentId: fixedStudentId,  // Use the fixed Student ID
      studentPassword: hashedStudentPassword,  // Use the fixed Student Password (hashed)
      role: userRole,
    });

    // Save new user to database
    await newUser.save();

    // Generate token and set cookie
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
        role: newUser.role,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in signupUser: ", err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: "Invalid username or password" });

    if (user.isFrozen) {
      user.isFrozen = false;
      await user.save();
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in loginUser: ", error.message);
  }
};

const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in logoutUser: ", err.message);
  }
};

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ error: "You cannot follow/unfollow yourself" });

    if (!userToModify || !currentUser)
      return res.status(400).json({ error: "User not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in followUnFollowUser: ", err.message);
  }
};

const updateUser = async (req, res) => {
  const { name, email, username, password, bio, role } = req.body;
  let { profilePic } = req.body;

  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ error: "You cannot update other user's profile" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;
    user.role = role || user.role;

    user = await user.save();

    await Post.updateMany(
      { "replies.userId": userId },
      {
        $set: {
          "replies.$[reply].username": user.username,
          "replies.$[reply].userProfilePic": user.profilePic,
        },
      },
      { arrayFilters: [{ "reply.userId": userId }] }
    );

    user.password = null;

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in updateUser: ", err.message);
  }
};

const getUserProfile = async (req, res) => {
  const { query } = req.params;

  try {
    let user;
    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query })
        .select("-password")
        .select("-updatedAt");
    } else {
      user = await User.findOne({ username: query })
        .select("-password")
        .select("-updatedAt");
    }

    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in getUserProfile: ", err.message);
  }
};

const freezeAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.isFrozen = true;  // Freeze the user account
    await user.save();  // Save the updated user document

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;  // The currently authenticated user's ID
    const usersFollowedByYou = await User.findById(userId).select("following");

    // Fetch random users that the current user is not following
    const users = await User.aggregate([
      { $match: { _id: { $ne: userId } } },  // Exclude the current user
      { $sample: { size: 10 } },  // Randomly sample 10 users
    ]);

    // Filter out users that the current user is already following
    const filteredUsers = users.filter(
      (user) => !usersFollowedByYou.following.includes(user._id)
    );

    // Slice to get top 4 suggested users
    const suggestedUsers = filteredUsers.slice(0, 4);

    // Remove the password field before sending the response
    suggestedUsers.forEach((user) => (user.password = null));

    res.status(200).json(suggestedUsers);  // Send the suggested users
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getSuggestedUsers: ", error.message);
  }
};


export {
  followUnFollowUser, freezeAccount, getSuggestedUsers, getUserProfile, loginUser,
  logoutUser, signupUser, updateUser
};


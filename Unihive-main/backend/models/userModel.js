import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
    isFrozen: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Student", "Faculty", "Alumni"],
      default: "Student",
<<<<<<< HEAD
    },
    studentId: {  // New field for student ID
      type: String,
      required: true,
    },
    studentPassword: {  // New field for student password
      type: String,
      required: true,
=======
>>>>>>> 1fc7699411d17cce5f82b80e4782caa8dcdfd6de
    },
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group", // Reference to the Group model
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
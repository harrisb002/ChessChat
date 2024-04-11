import { mongoose } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => uuid.v4().replace(/\-/g, "") },
    userId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: false },
    email: { type: String, required: true },

    // Arrays of references to the clubs, members, and channels
    clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
    channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Profile", profileSchema);
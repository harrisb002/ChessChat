const mongoose = require('mongoose');
const uuidv4 = require('uuid');

const profileSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => uuidv4().replace(/\-/g, "") },
    userId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: false },
    email: { type: String, required: true },

    // Arrays of references to the clubs, members, and channels
    clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }],
    channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Profile", profileSchema);
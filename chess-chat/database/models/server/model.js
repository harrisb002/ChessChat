const mongoose = require('mongoose');
import { v4 as uuidv4 } from "uuid";

const clubSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuid.v4().replace(/\-/g, '') },
  name: { type: String, required: true },
  imageUrl: { type: String, required: false },
  inviteCode: { type: String, required: false },
  
  // Reference to the profile that created the club
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  
  // Automatically managed createdAt and updatedAt fields
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('club', clubSchema);

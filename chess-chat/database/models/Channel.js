const mongoose = require('mongoose');
const uuidv4 = require('uuid');

const channelSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4().replace(/\-/g, '') },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['TEXT', 'AUDIO', 'VIDEO'],
    default: 'TEXT'
  },
  
  // Reference to the profile
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  
  // Reference to the club
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
  
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('Channel', channelSchema);

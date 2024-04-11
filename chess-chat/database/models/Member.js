const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); 
const uuidv4 = require('uuid');

// MemberRole enum values
const MemberRoles = Object.freeze({
  GUEST: 'GUEST',
  MEMBER: 'MEMBER',
  ADMIN: 'ADMIN',
});

const memberSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4().replace(/\-/g, '') },
  role: { type: String, enum: Object.values(MemberRoles), default: MemberRoles.GUEST },
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', index: true },
  serverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Server', index: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Apply the uniqueValidator plugin to memberSchema to add pre-save validation for unique fields within Mongoose schema
memberSchema.plugin(uniqueValidator);

// Freeze the MemberRoles object to prevent modifications
Object.freeze(MemberRoles);

module.exports = mongoose.model('Member', memberSchema);

import { mongoose } from "mongoose"

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      immutable: true,
    },
    email: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", profileSchema);
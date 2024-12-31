

const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    _id:{type:mongoose.Schema.Types.ObjectId,auto:true},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
    avatar: {
      type: String,
      required: false,
      trim: true,
    },
    myList: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;

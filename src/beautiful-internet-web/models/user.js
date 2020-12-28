const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    required: true,
  },
  voteHistory: [
    {
      postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
      },
      voteValue: Number
    }
  ]
});

module.exports = mongoose.model("User", userSchema);

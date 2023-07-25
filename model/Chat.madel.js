const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    frist_person: {
      type: String,
      required: true,
    },
    second_person: {
      type: String,
      required: true,
    },
    conversion: {
      type: Array,
      default: [],
    },
  },
  { timestamps: false }
);



const ChatModel = mongoose.model("chat", ChatSchema)
module.exports = {
    ChatModel
}

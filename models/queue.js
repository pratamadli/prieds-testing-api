const mongoose = require("mongoose");
// var mhl = require("mongoose-history-log");

const Schema = mongoose.Schema;
const QueueSchema = new Schema(
  {
    visitorNumber: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    queueNumber: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      enum: ["insurance", "private"],
      required: true,
    },
    polyclinicCode: {
      type: String,
      required: true,
    },
    polyclinicName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["queue", "done"],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Queue", QueueSchema);

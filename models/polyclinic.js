const mongoose = require("mongoose");
// var mhl = require("mongoose-history-log");

const Schema = mongoose.Schema;
const PolyclinicSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Polyclinic", PolyclinicSchema);

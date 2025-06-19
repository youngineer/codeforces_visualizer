const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  emailId: {
    type: String,
    trim: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
    trim: true,
  },
  currentRating: {
    type: Number,
    required: true
  },
  maxRating: {
    type: Number,
    required: true
  },
  userStatus: {
    totalSolved: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
    mostDifficultRating: { type: Number, default: 0 },
    ratingBuckets: { type: Map, of: Number, default: {} },
    heatMapData: { type: Map, of: Number, default: {} }
  },
  contestHistory: {
    type: Map,
    of: new Schema({
      rank: { type: Number },
      oldRating: { type: Number },
      newRating: { type: Number },
      unsolvedProblems: { type: Number }
    }),
    default: {}
  }

}, { timestamps: true });


const Student = mongoose.model('Student', studentSchema);
module.exports = {
    Student
};
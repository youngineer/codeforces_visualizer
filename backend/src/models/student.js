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
  averageRating: { type: Number, default: 0 },
  mostDifficultRating: { type: Number, default: 0 },
  averagePerDay: { type: Number, default: 0 },
  ratingBuckets: {
    type: Map,
    of: new mongoose.Schema({
      count: { type: Number, required: true },
      date: { type: String }
    }),
    default: {}
  },
    heatMapData: {
      type: Map,
      of: new mongoose.Schema({
        count: { type: Number, required: true },
        date: { type: Date, default: Date.now }
      }),
      default: {}
    }
  },
  contestHistory: {
    type: Map,
    of: new Schema({
      rank: { type: Number },
      oldRating: { type: Number },
      newRating: { type: Number },
      unsolvedProblems: { type: Number },
      date: {type: String}
    }),
    default: {}
  }

}, { timestamps: true });


const Student = mongoose.model('Student', studentSchema);
module.exports = {
    Student
};
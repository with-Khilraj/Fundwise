//models Campaign.js
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  user: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  story: { type: String, required: true },
  goal: { type: Number, required: true },
  raised: { type: Number, default: 0 },
  endDate: { type: Date, required: true },
  image: { type: String, required: true },
  topDonors: { type: [String], default: [] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  comments: { type: [commentSchema], default: [] },
  donations: { type: [donationSchema], default: [] },
  status: { type: String, enum: ['Draft', 'Active', 'Completed', 'Closed'], default: 'Draft' },
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);

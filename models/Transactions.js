const mongoose = require('mongoose');

// schema for transactions in db
const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transactions', TransactionSchema);

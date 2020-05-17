const Transactions = require('../models/Transactions');

// @desc Add transaction
// @route POST /api/transactions
// method that sends  info and is imported in routes
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transactions.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error! Transaction was not added',
    });
  }
};

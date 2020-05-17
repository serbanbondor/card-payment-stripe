const express = require('express');
const router = express.Router();
const { addTransaction } = require('../controllers/transactionsController');

// import the method from the controller and this gets send to the api - used for GET and POST
router.route('/transactions').post(addTransaction);

module.exports = router;

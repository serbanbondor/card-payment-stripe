const express = require('express');
const router = express.Router();

// import the method from the controller and this gets send to the api - used for GET and POST
router.route('/transactions');

module.exports = router;

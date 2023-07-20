const express = require('express');
const router = express.Router();
const logOutController = require('../../controllers/AuthControllers/logOutController');

router.get('/', logOutController.handleLogOut);

module.exports = router;

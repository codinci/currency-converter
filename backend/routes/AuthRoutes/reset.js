const express = require("express");
const router = express.Router();
const resetPassword = require('../../controllers/AuthControllers/resetPasswordController.js')

router.post('/password', resetPassword.handleReset)

module.exports = router
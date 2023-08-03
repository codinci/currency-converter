const express = require("express");
const router = express.Router();
const verifyController = require("../../controllers/AuthControllers/verifyEmailController");

router.get('/verify/:id/:token', verifyController.handleVerification);

module.exports = router;

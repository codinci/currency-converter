const express = require("express");
const router = express.Router();
const refreshTokenController = require("../../controllers/AuthControllers/refreshTokenController");

router.get('/',refreshTokenController.handleRefreshToken );

module.exports = router;

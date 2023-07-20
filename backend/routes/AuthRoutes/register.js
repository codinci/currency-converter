const express = require("express");
const router = express.Router();
const registrationController = require("../../controllers/AuthControllers/registrationController");

router.post('/', registrationController.handleNewUser);

module.exports = router;

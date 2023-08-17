const express = require("express");
const router = express.Router();
const test = require('../controllers/testController')

router.get('/user/:id', test.getUser)

module.exports = router
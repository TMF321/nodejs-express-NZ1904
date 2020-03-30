const express = require('express');

const userController = require("../controllers/userController");

const router = express.Router();

/**
 * http://locahlost:7778/register
*/

router.post("/register", userController.register);

router.post("/login", userController.login);

module.exports = router;
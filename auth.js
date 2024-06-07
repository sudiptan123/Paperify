const express = require("express");
// const authController = require("../controllers/auth.js"); 
const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const router = express.Router();

// router.post('/register', authController.register);
// router.post('/login', authController.login);
// router.get('/logout', authController.logout);

module.exports = router;

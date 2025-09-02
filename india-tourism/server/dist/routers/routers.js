"use strict";
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
//password-hashing function
const bcrypt = require("bcrypt");
require("../logNginx");
//to get details of an authenticated user
const { doSignup } = require("../controller/signup");
const { checkAuthenticated } = require("../middlewares/auth");
const { signupvalidate, validateOTP } = require("../controller/validations");
const router = express.Router();
router.post("/dosignup", signupvalidate, doSignup);
router.post("/validateOTP", checkAuthenticated, validateOTP);
module.exports = router;

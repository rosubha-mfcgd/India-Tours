const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
//password-hashing function
const bcrypt = require("bcrypt")
require("../logNginx");
//to get details of an authenticated user
const { doSignup } = require("../controller/signup");
const {checkAuthenticated} = require("../middlewares/auth");
const {signupvalidate,validateOTP} = require("../controller/validations");
const {getPoints} = require("../controller/userprofile");
const {getCategories} = require("../controller/tripDetails");
const router = express.Router();



router.post("/dosignup",signupvalidate,doSignup);

router.post("/validateOTP",checkAuthenticated,validateOTP);

router.post("/getPoints",checkAuthenticated,getPoints);

router.get("/getCategories",checkAuthenticated,getCategories);

module.exports = router 
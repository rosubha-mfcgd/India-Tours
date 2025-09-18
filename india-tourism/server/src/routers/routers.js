const express = require('express');
//password-hashing function
require("../logNginx");
//to get details of an authenticated user
const { doSignup } = require("../controller/signup");
const {checkAuthenticated} = require("../middlewares/auth");
const {signupvalidate,validateOTP} = require("../controller/validations");
const {getPoints} = require("../controller/userprofile");
const {getCategories,getToursByCategoryId} = require("../controller/tripDetails");
const router = express.Router();



router.post("/dosignup",checkAuthenticated,signupvalidate,doSignup);

router.post("/validateOTP",checkAuthenticated,validateOTP);

router.post("/getPoints",checkAuthenticated,getPoints);

router.get("/getCategories",checkAuthenticated,getCategories);

router.get("/getToursByCategoryId",checkAuthenticated,getToursByCategoryId);


module.exports = router 
"use strict";
const express = require('express');
//password-hashing function
require("../logNginx");
//to get details of an authenticated user
const { doSignup } = require("../controller/signup");
const { checkAuthenticated } = require("../middlewares/auth");
const { signupvalidate, validateOTP } = require("../controller/validations");
const { getPoints } = require("../controller/userprofile");
const { getCategories, getProducts, getToursByCategoryId, updateFavoriteCategory } = require("../controller/tripDetails");
const { getRegisteredTourManagers, getCities } = require("../controller/tourManagers");
const { performBookings } = require("../controller/tourBookings");
const router = express.Router();
router.post("/dosignup", checkAuthenticated, signupvalidate, doSignup);
router.post("/validateOTP", checkAuthenticated, validateOTP);
router.post("/getPoints", checkAuthenticated, getPoints);
router.get("/getCategories", checkAuthenticated, getCategories);
router.get("/getProducts", checkAuthenticated, getProducts);
router.get("/getCities", checkAuthenticated, getCities);
router.get("/getToursByCategoryId", checkAuthenticated, getToursByCategoryId);
router.get("/getTourOperators", checkAuthenticated, getRegisteredTourManagers);
router.post("/updateFavoriteCategory", checkAuthenticated, updateFavoriteCategory);
router.post("/performBookings", checkAuthenticated, performBookings);
module.exports = router;

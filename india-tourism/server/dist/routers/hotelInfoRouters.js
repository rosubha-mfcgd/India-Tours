"use strict";
const express = require('express');
//password-hashing function
require("../logNginx");
//to get details of an authenticated user
const { doSignup } = require("../controller/signup");
const { checkAuthenticated } = require("../middlewares/auth");
const { signupvalidate, validateOTP } = require("../controller/validations");
const { getPoints } = require("../controller/userprofile");
const { getCategories, getProducts, getToursByCategoryId, updateFavoriteCategory, getTourItenerariesForTrip, getRecommendedTours } = require("../controller/tripDetails");
const { getRegisteredTourManagers, getCities } = require("../controller/tourManagers");
const { performBookings, performBookingsByMobile, performUserBookings, getBookingsByBookingId, updateBookingsByBookingId, createPaymentIntent } = require("../controller/tourBookings");
const { getSearchOptions, getPreferences } = require("../controller/searchOptions");
const { sendConfirmation } = require('../controller/sendCommunication');
const { resendOTP, getKeycloakAuthToken } = require('../controller/loginuser');
const { findUser, updateProfile } = require('../controller/userprofile');
const { checkUserAuthenticated } = require("../middlewares/userAuth");
const { processImage } = require("../controller/imageProcessor");
const router = express.Router();

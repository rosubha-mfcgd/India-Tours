const express = require('express');
//password-hashing function
require("../logNginx");
//to get details of an authenticated user
const { doSignup } = require("../controller/signup");
const {checkAuthenticated} = require("../middlewares/auth");
const {signupvalidate,validateOTP} = require("../controller/validations");
const {getPoints} = require("../controller/userprofile");
const {getCategories,getProducts,getToursByCategoryId,
    updateFavoriteCategory,getTourItenerariesForTrip} = require("../controller/tripDetails");
const {getRegisteredTourManagers, getCities} = require("../controller/tourManagers");
const {performBookings, performBookingsByMobile,getBookingsByBookingId,updateBookingsByBookingId} = require("../controller/tourBookings");
const {getSearchOptions,getPreferences} = require("../controller/searchOptions");
const { sendConfirmation } = require('../controller/sendCommunication');
const {resendOTP} = require('../controller/loginuser');
const {findUser,updateProfile} = require('../controller/userprofile')
const router = express.Router();



router.post("/dosignup",checkAuthenticated,signupvalidate,doSignup);

router.post("/validateOTP",checkAuthenticated,validateOTP);

router.post("/getPoints",checkAuthenticated,getPoints);

router.get("/getCategories",checkAuthenticated,getCategories);

router.get("/getProducts",checkAuthenticated,getProducts);

router.get("/getCities",checkAuthenticated,getCities);

router.get("/getToursByCategoryId",checkAuthenticated,getToursByCategoryId);

router.get("/getTourOperators",checkAuthenticated,getRegisteredTourManagers);

router.post("/updateFavoriteCategory",checkAuthenticated,updateFavoriteCategory);
router.post("/performBookings",checkAuthenticated,performBookings);
router.post("/performBookingsByMobile",checkAuthenticated,performBookingsByMobile);
router.post("/getBookingsByBookingId",checkAuthenticated,getBookingsByBookingId);
router.post("/updateBookingsByBookingId",checkAuthenticated,updateBookingsByBookingId);
router.post("/sendConfirmation",checkAuthenticated,sendConfirmation);
router.get("/searchMyOptions",checkAuthenticated,getSearchOptions);
router.post("/tourItenerariesForTrip",checkAuthenticated,getTourItenerariesForTrip);
router.post("/resendOTP",checkAuthenticated,resendOTP);
router.post("/findUser",checkAuthenticated,findUser);
router.post("/updateProfile",checkAuthenticated,updateProfile);
router.get("/preferences",checkAuthenticated,getPreferences);

module.exports = router 

updateProfile
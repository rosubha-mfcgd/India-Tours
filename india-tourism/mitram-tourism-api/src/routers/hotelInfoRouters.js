const express = require('express');
//to get details of an authenticated user
const { fetchHotelInitToken,getKeycloakAuthToken } = require("../controller/fetchHotelInfoToken");
const {searchHotelByGeoCodeAndAvailableDates} = require("../controller/searchHotel");
const {checkRequestAuthenticated} = require("../middlewares/userAuth")

const router = express.Router();

router.post("/authToken",getKeycloakAuthToken);
router.post("/fetchHotelInitToken",checkRequestAuthenticated,fetchHotelInitToken);
router.post("/searchHotel",checkRequestAuthenticated,searchHotelByGeoCodeAndAvailableDates);
module.exports = router
const express = require('express');
//password-hashing function
require("../logNginx");
//to get details of an authenticated user
const { fetchHotelInitToken,getKeycloakAuthToken } = require("../controller/fetchHotelInfoToken");
const {checkRequestAuthenticated} = require("../middlewares/userAuth")

const router = express.Router();

router.post("/authToken",getKeycloakAuthToken);
router.post("/fetchHotelInitToken",checkRequestAuthenticated,fetchHotelInitToken);

module.exports = router
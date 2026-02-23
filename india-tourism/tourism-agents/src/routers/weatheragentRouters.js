const express = require('express');
//password-hashing function
require("../logNginx");
//to get details of an authenticated user
const {checkRequestAuthenticated} = require("../middlewares/userAuth")
const {findWeatherDetailByState} = require("../controllers/weatherDetailController")

const router = express.Router();
router.post("/retrieveWeatherInfoFromGemini",checkRequestAuthenticated,findWeatherDetailByState);

module.exports = router
const express = require('express');
const router = express.Router();
const { getAllCountries,getCountryById } = require('../controllers/countryController');
const { authenticate } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

router.get('/', authenticate,allowRoles([1,2,3]), getAllCountries);      // Get all countries
router.get('/:id', authenticate,allowRoles([1,2,3]),  getCountryById);   // Get country by ID
module.exports = router;

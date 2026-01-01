const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');
const { authenticate } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

// CRUD routes
router.post('/',authenticate, allowRoles([1,2]), cityController.addCity);         // Add city
router.put('/:id', authenticate, allowRoles([1,2]), cityController.updateCity);   // Update city
router.delete('/:id', authenticate, allowRoles([1,2]), cityController.deleteCity); // Delete city
router.get('/', authenticate,allowRoles([1,2,3]), cityController.getAllCities);    // Get all cities
router.get('/:id', authenticate,allowRoles([1,2,3]), cityController.getCityById);  // Get city by ID
router.get('/:stateId', authenticate,allowRoles([1,2,3]), cityController.getCitiesByState);  // Get cities by state ID
module.exports = router;

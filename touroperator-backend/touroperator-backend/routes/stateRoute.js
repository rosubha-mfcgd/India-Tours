const express = require('express');
const router = express.Router();
const { addState , updateState ,  getAllStates , getStateById, deleteState } = require('../controllers/stateController');
const { authenticate } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

// CRUD routes
router.post('/',authenticate, allowRoles([1,2]),  addState);          // Add state
router.put('/:id',authenticate, allowRoles([1,2]), updateState);    // Update state
router.delete('/:id',authenticate, allowRoles([1,2]), deleteState); // Delete state
router.get('/', authenticate,allowRoles([1,2,3]), getAllStates);      // Get all states
router.get('/:id', authenticate,allowRoles([1,2,3]),  getStateById);   // Get state by ID
module.exports = router;

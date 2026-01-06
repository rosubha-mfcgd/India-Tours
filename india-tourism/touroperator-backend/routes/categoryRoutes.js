const express = require("express");
const router = express.Router();
const { getCategories , getCategoryById, createCategory, uploadCategoryImage , updateCategory , deleteCategory } = require("../controllers/categoryController");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");

// GET all products
router.get("/", authenticate, authorizeRole(1), getCategories);

// GET product by ID
router.get("/:id", authenticate, authorizeRole(1), getCategoryById);

// CREATE product with image
router.post(
  "/",
  authenticate,
  authorizeRole(1,2),
  uploadCategoryImage,
  createCategory
);


router.put("/:id",
  authenticate,
  authorizeRole(1,2),
  uploadCategoryImage,
  updateCategory);

router.delete("/:id", 
  authenticate,
  authorizeRole(1,2),
  deleteCategory);
module.exports = router;


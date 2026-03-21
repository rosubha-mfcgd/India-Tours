const express = require("express");
const router = express.Router();
const { getProducts , getProductById, createProduct, uploadProductImage , updateProduct , deleteProduct } = require("../controllers/productController");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");

// GET all products
router.get("/", authenticate, authorizeRole(1), getProducts);

// GET product by ID
router.get("/:id", authenticate, authorizeRole(1), getProductById);

// CREATE product with image
router.post(
  "/",
  authenticate,
  authorizeRole(1),
  uploadProductImage,
  createProduct
);


router.put("/:id",
  authenticate,
  authorizeRole(1),
  uploadProductImage,
  updateProduct);

router.delete("/:id", 
  authenticate,
  authorizeRole(1),
  deleteProduct);
module.exports = router;


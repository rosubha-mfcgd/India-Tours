const express = require("express");
const router = express.Router();
const { streamImage } = require("../controllers/imageController");
const { authenticate } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

router.get(
  "/:fileId",
  authenticate,
  allowRoles([1, 2]),
  streamImage
);

module.exports = router;

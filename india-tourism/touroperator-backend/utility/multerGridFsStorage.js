const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
require("dotenv").config();

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: () => {
    const filename = `product-${Date.now()}-${crypto.randomBytes(8).toString("hex")}`;
    return {
      filename,
      bucketName: "productImages",
    };
  },
});

module.exports = storage;
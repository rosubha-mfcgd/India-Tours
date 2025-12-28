// middleware/upload.js
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

/**
 * Returns multer middleware for uploading a single image to GridFS
 * @param {string} bucketName - Name of GridFS bucket
 * @param {function|String} getTourId - Function that returns tourId or a fixed value
 */

exports.uploadImage = (bucketName) => {  
  const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
      const tourId = req.tourId || req.params?.id;
      if (!tourId) {
        throw new Error("tourId missing on request");
      }
      console.log('Uploading image for tourId:', tourId);
      return {
        bucketName,
        filename: `${tourId}-${Date.now()}-${file.originalname}`,
        metadata: {
          tourId: tourId,
          type: "tour-image",
        },
      };
    },
  });

  return multer({ storage }).single("image");
};

exports.deleteOldTourImage = (bucketName) =>  async (req, res, next) => {
  try {
    const tourId = req.params.id;
    if (!tourId) return next();

    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: "tourImages",
    });

    // Find old image by metadata.tourId
    const files = await bucket.find({ "metadata.tourId": tourId }).toArray();

    for (const file of files) {
      await bucket.delete(file._id);
    }

    next();
  } catch (err) {
    console.error("Failed to delete old tour image:", err);
    next(err);
  }
};


exports.fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files allowed"), false);
  }
  cb(null, true);
};
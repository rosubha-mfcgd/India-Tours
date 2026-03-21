const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

let bucket;

// initialize once
mongoose.connection.once("open", () => {
  bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "tourImages"
  });
});

exports.streamImage = async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.fileId);

    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.on("error", () => {
      return res.status(404).json({ error: "Image not found" });
    });

    res.set("Content-Type", "image/jpeg"); // or dynamic
    downloadStream.pipe(res);

  } catch (err) {
    res.status(400).json({ error: "Invalid image id" });
  }
};

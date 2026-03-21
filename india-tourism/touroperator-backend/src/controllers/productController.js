const Product = require("../models/Product");
const Counter = require("../models/Counter");
const mongoose = require("mongoose");
const multer = require("multer");
const axios = require("axios");
const stream = require("stream");
const storage = require("../utility/multerGridFsStorage"); 

require("dotenv").config();



// Middleware to upload single file
const upload = multer({ storage });
exports.uploadProductImage = upload.single("image");

/**
 * CREATE PRODUCT
 * RoleID: 1 only
 * Supports:
 *  - multipart/form-data image upload
 *  - imageUrl (download & stream to GridFS)
 */
exports.createProduct = async (req, res) => {
  try {
    if (req.user.roleID !== 1) {
      return res.status(403).json({ message: "Only admins can create products" });
    }

    const { productName, productDesc, image } = req.body;

    if (!productName || !productDesc || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Prevent duplicate productID
    if (productName) {
      const exists = await Product.findOne({ productName });
      if (exists) {
        return res.status(400).json({ message: "Product Name already exists" });
      }
    }

    // 🔹 Generate productID
    const counter = await Counter.findOneAndUpdate(
      { name: "productID" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const productID = `PRD-${String(counter.seq).padStart(4, "0")}`;

    let imageFileId = null;

    /** CASE 1: multipart/form-data image upload */
    if (req.file) {
      imageFileId = req.file.id;
    }

    /** CASE 2: image URL → download → GridFS */
    else if (image) {
      const conn = mongoose.connection;
      const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "productImages",
      });

      const response = await axios.get(image, { responseType: "stream" });
      const filename = `product-${productName}-${Date.now()}`;

      const uploadStream = bucket.openUploadStream(filename);
      response.data.pipe(uploadStream);

      await new Promise((resolve, reject) => {
        uploadStream.on("finish", resolve);
        uploadStream.on("error", reject);
      });

      imageFileId = uploadStream.id;
    }

    const product = new Product({
      productID,
      "Product Name": productName,
      "Product Desc": productDesc,
      image: imageFileId,
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all products with Base64 images
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const conn = mongoose.connection;

    if (!conn.db) {
      return res.status(500).json({ message: "Database not connected" });
    }

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "productImages",
    });

    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        if (!product.image) {
          return { ...product._doc, image: null };
        }

        try {
          const downloadStream = bucket.openDownloadStream(
            new mongoose.Types.ObjectId(product.image)
          );

          const chunks = [];
          for await (const chunk of downloadStream) {
            chunks.push(chunk);
          }

          const buffer = Buffer.concat(chunks);
          const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;

          return {
            ...product._doc,
            image: base64Image,
          };
        } catch (err) {
          console.error("Image fetch failed:", err);
          return {
            ...product._doc,
            image: null,
          };
        }
      })
    );

    res.json(productsWithImages);
  } catch (err) {
    console.error("getProducts error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET product including image as URL
// GET product by ID including image as Base64
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.image) {
      const conn = mongoose.connection;
      const bucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "productImages" });
      const downloadStream = bucket.openDownloadStream(product.image);

      const chunks = [];
      downloadStream.on("data", (chunk) => chunks.push(chunk));
      downloadStream.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;
        res.json({ ...product._doc, image: base64Image });
      });
      downloadStream.on("error", (err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to load image" });
      });
    } else {
      res.json(product);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * UPDATE PRODUCT
 * RoleID: 1 only
 * Supports updating:
 *  - productName
 *  - productDesc
 *  - image (file upload or image URL)
 */
exports.updateProduct = async (req, res) => {
  try {
    if (req.user.roleID !== 1) {
      return res.status(403).json({ message: "Only admins can update products" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { productName, productDesc, image } = req.body;

    // Prevent duplicate productName
    if (productName && productName !== product.productName) {
      const exists = await Product.findOne({ productName });
      if (exists) {
        return res.status(400).json({ message: "Product Name already exists" });
      }
      product.productName = productName;
    }

    if (productDesc) product.productDesc = productDesc;

    // Handle new image upload
    if (req.file || image) {
      const conn = mongoose.connection;
      const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "productImages",
      });

      let imageFileId;

      if (req.file) {
        imageFileId = req.file.id;
      } else if (image) {
        const response = await axios.get(image, { responseType: "stream" });
        const filename = `product-${productName || product.productName}-${Date.now()}`;
        const uploadStream = bucket.openUploadStream(filename);
        response.data.pipe(uploadStream);
        await new Promise((resolve, reject) => {
          uploadStream.on("finish", resolve);
          uploadStream.on("error", reject);
        });
        imageFileId = uploadStream.id;
      }

      // Delete old image from GridFS if exists
      if (product.image) {
        try {
          await bucket.delete(new mongoose.Types.ObjectId(product.image));
        } catch (err) {
          console.error("Failed to delete old image:", err);
        }
      }

      product.image = imageFileId;
    }

    await product.save();

    // Return updated product with Base64 image
    let updatedProduct = product.toObject();
    if (product.image) {
      const downloadStream = bucket.openDownloadStream(product.image);
      const chunks = [];
      for await (const chunk of downloadStream) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);
      updatedProduct.image = `data:image/png;base64,${buffer.toString("base64")}`;
    }

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE PRODUCT
 * RoleID: 1 only
 * Deletes product and image from GridFS
 */
exports.deleteProduct = async (req, res) => {
  try {
    if (req.user.roleID !== 1) {
      return res.status(403).json({ message: "Only admins can delete products" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const conn = mongoose.connection;
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "productImages",
    });

    // Delete image from GridFS if exists
    if (product.image) {
      try {
        await bucket.delete(new mongoose.Types.ObjectId(product.image));
      } catch (err) {
        console.error("Failed to delete image:", err);
      }
    }

    await Product.deleteOne({ _id: req.params.id });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
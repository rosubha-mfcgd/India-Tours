const Category = require("../models/Category");
const Counter = require("../models/Counter");
const mongoose = require("mongoose");
const multer = require("multer");
const stream = require("stream");
const storage = require("../utility/multerGridFsStorage"); 
const getNextSequence = require("../utility/getNextSequence");
require("dotenv").config();



// Middleware to upload single file
const upload = multer({ storage });

exports.uploadCategoryImage = upload.single("image");

/**
 * CREATE PRODUCT
 * RoleID: 1 only
 * Supports:
 *  - multipart/form-data image upload
 *  - imageUrl (download & stream to GridFS)
 */




exports.createCategory = async (req, res) => {
  try {
    // Only admin
    if (req.user.roleID !== 1) {
      return res.status(403).json({ message: "Only admins can create categories" });
    }

    const { categoryName, categoryDesc, image } = req.body;

    if (!categoryName || !categoryDesc) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Prevent duplicate name
    const exists = await Category.findOne({ name: categoryName.trim() });
    if (exists) {
      return res.status(400).json({ message: "Category name already exists" });
    }

    // 🔹 Generate numeric _id for category
    const numericId = await getNextSequence("category");

    let imageFileId = null;

    // CASE 1: multipart/form-data image upload
    if (req.file) {
      imageFileId = req.file.id;
    }

    // CASE 2: image URL → download → GridFS
    else if (image) {
      const conn = mongoose.connection;
      const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "categoryImages"
      });

      const response = await axios.get(image, { responseType: "stream" });
      const filename = `category-${categoryName}-${Date.now()}`;

      const uploadStream = bucket.openUploadStream(filename);
      response.data.pipe(uploadStream);

      await new Promise((resolve, reject) => {
        uploadStream.on("finish", resolve);
        uploadStream.on("error", reject);
      });

      imageFileId = uploadStream.id;
    }

    // Create category with numeric _id
    const category = new Category({
      _id: numericId,
      name: categoryName.trim(),
      description: categoryDesc.trim(),
      image: imageFileId,
      productID:1
    });

    await category.save();

    res.status(201).json({
      message: "Category created successfully",
      data: {
        categoryId: category._id,  // numeric ID
        name: category.name,
        description: category.description,
        image: category.image
      }
    });
  } catch (err) {
    console.error("Create category error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET all categories with Base64 images
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    const conn = mongoose.connection;

    if (!conn.db) {
      return res.status(500).json({ message: "Database not connected" });
    }

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "categoryImages",
    });

    const categoriesWithImages = await Promise.all(
      categories.map(async (category) => {
        if (!category.image) {
          return { ...category._doc, image: null };
        }

        try {
          const downloadStream = bucket.openDownloadStream(
            new mongoose.Types.ObjectId(category.image)
          );

          const chunks = [];
          for await (const chunk of downloadStream) {
            chunks.push(chunk);
          }

          const buffer = Buffer.concat(chunks);
          const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;

          return {
            ...category._doc,
            image: base64Image,
          };
        } catch (err) {
          console.error("Image fetch failed:", err);
          return {
            ...category._doc,
            image: null,
          };
        }
      })
    );

    res.json(categoriesWithImages);
  } catch (err) {
    console.error("getCategorys error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET category including image as URL
// GET category by ID including image as Base64
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    if (category.image) {
      const conn = mongoose.connection;
      const bucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "categoryImages" });
      const downloadStream = bucket.openDownloadStream(category.image);

      const chunks = [];
      downloadStream.on("data", (chunk) => chunks.push(chunk));
      downloadStream.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;
        res.json({ ...category._doc, image: base64Image });
      });
      downloadStream.on("error", (err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to load image" });
      });
    } else {
      res.json(category);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * UPDATE CATEGORY
 * RoleID: 1 only
 * Supports updating:
 *  - name
 *  - description
 *  - image (file upload or image URL)
 */
exports.updateCategory = async (req, res) => {
  try {
    if (req.user.roleID !== 1) {
      return res.status(403).json({ message: "Only admins can update categories" });
    }

    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const { categoryName, categoryDesc, image } = req.body;

    // Prevent duplicate name
    if (categoryName && categoryName !== category.name) {
      const exists = await Category.findOne({ name: categoryName });
      if (exists) {
        return res.status(400).json({ message: "Category Name already exists" });
      }
      category.name = categoryName;
    }

    if (categoryDesc) category.description = categoryDesc;

    // ✅ Create bucket ONCE
    const conn = mongoose.connection;
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "categoryImages",
    });

    // Handle new image upload
    if (req.file || image) {
      let imageFileId;

      if (req.file) {
        imageFileId = req.file.id;
      } else if (image) {
        const response = await axios.get(image, { responseType: "stream" });
        const filename = `category-${category.name}-${Date.now()}`;
        const uploadStream = bucket.openUploadStream(filename);

        response.data.pipe(uploadStream);
        await new Promise((resolve, reject) => {
          uploadStream.on("finish", resolve);
          uploadStream.on("error", reject);
        });

        imageFileId = uploadStream.id;
      }

      // Delete old image
      if (category.image) {
        try {
          await bucket.delete(new mongoose.Types.ObjectId(category.image));
        } catch (err) {
          console.error("Failed to delete old image:", err);
        }
      }

      category.image = imageFileId;
    }

    await category.save();

    // Return updated category with Base64 image
    const updatedCategory = category.toObject();

    if (category.image) {
      const downloadStream = bucket.openDownloadStream(
        new mongoose.Types.ObjectId(category.image)
      );

      const chunks = [];
      for await (const chunk of downloadStream) {
        chunks.push(chunk);
      }

      const buffer = Buffer.concat(chunks);
      updatedCategory.image = `data:image/png;base64,${buffer.toString("base64")}`;
    }

    res.json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (err) {
    console.error("Update category error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * DELETE PRODUCT
 * RoleID: 1 only
 * Deletes category and image from GridFS
 */
exports.deleteCategory = async (req, res) => {
  try {
    if (req.user.roleID !== 1) {
      return res.status(403).json({ message: "Only admins can delete categories" });
    }

    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const conn = mongoose.connection;
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "categoryImages",
    });

    // Delete image from GridFS if exists
    if (category.image) {
      try {
        await bucket.delete(new mongoose.Types.ObjectId(category.image));
      } catch (err) {
        console.error("Failed to delete image:", err);
      }
    }

    await Category.deleteOne({ _id: req.params.id });

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
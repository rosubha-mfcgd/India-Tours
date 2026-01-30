"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    _id: {
        type: Number,
        required: true
    },
    categoryName: {
        type: String,
        required: true,
        trim: true,
    },
    categoryDesc: {
        type: String,
        required: true,
        trim: true,
    },
    favorite: {
        type: String,
    }
});
exports.CategoryModel = (0, mongoose_1.model)('Category', categorySchema);

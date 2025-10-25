"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    productID: {
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    productDesc: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    mobileimage: {
        type: String,
        required: true,
        trim: true,
    },
    favorite: {
        type: String,
    }
});
exports.ProductModel = (0, mongoose_1.model)('Product', productSchema);

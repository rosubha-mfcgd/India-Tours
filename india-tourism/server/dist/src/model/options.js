"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsModel = void 0;
const mongoose_1 = require("mongoose");
const optionSchema = new mongoose_1.Schema({
    categoryID: {
        type: Number,
        required: true
    },
    optionName: {
        type: String,
        required: true,
        trim: true,
    },
    optionDesc: {
        type: String,
        required: true,
        trim: true,
    },
    favorite: {
        type: String,
    },
    productID: {
        type: Number,
        required: true
    },
    optionID: {
        type: Number,
        required: true
    }
});
exports.OptionsModel = (0, mongoose_1.model)('Options', optionSchema);

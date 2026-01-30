"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceModel = void 0;
const mongoose_1 = require("mongoose");
const preferenceSchema = new mongoose_1.Schema({
    code: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
});
exports.PreferenceModel = (0, mongoose_1.model)('Preferences', preferenceSchema);

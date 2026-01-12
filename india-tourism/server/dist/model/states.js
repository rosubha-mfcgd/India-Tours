"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateModel = void 0;
const mongoose_1 = require("mongoose");
const stateSchema = new mongoose_1.Schema({
    _id: {
        type: Number,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true
    }
});
exports.StateModel = (0, mongoose_1.model)('State', stateSchema);

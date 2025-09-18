"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourManagerModel = void 0;
const mongoose_1 = require("mongoose");
const tourmanagerSchema = new mongoose_1.Schema({
    tourManagerId: {
        type: String,
        required: true
    },
    tourManagerName: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    backupcontact: String,
    desc: String,
    cityCode: {
        type: Number,
        required: true
    },
    websiteURL: String
});
exports.TourManagerModel = (0, mongoose_1.model)('TourManagers', tourmanagerSchema);

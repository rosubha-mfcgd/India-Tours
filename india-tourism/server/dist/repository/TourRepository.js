"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourRepository = void 0;
const tours_1 = require("../model/tours");
class TourRepository {
    create(toursData) {
        return __awaiter(this, void 0, void 0, function* () {
            const tour = new tours_1.ToursModel(toursData);
            return tour.save();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return tours_1.ToursModel.findById(id).exec();
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return tours_1.ToursModel.findOne(query).exec();
        });
    }
    findAll() {
        return __awaiter(this, arguments, void 0, function* (query = {}) {
            return tours_1.ToursModel.find(query).exec();
        });
    }
    update(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return tours_1.ToursModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return tours_1.ToursModel.findByIdAndDelete(id).exec();
        });
    }
}
exports.TourRepository = TourRepository;

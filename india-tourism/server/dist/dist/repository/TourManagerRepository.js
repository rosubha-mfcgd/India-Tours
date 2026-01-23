"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourManagerRepository = void 0;
const tourmanager_1 = require("../model/tourmanager");
const BaseRepository_1 = require("./BaseRepository");
class TourManagerRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(tourmanager_1.TourManagerModel);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return tourmanager_1.TourManagerModel.findById(id).exec();
        });
    }
}
exports.TourManagerRepository = TourManagerRepository;

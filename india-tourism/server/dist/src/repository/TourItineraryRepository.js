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
exports.TourItineraryRepository = void 0;
const touritinerary_1 = require("../model/touritinerary");
const BaseRepository_1 = require("./BaseRepository");
class TourItineraryRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(touritinerary_1.ItineraryModel);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return touritinerary_1.ItineraryModel.findById(id).exec();
        });
    }
}
exports.TourItineraryRepository = TourItineraryRepository;

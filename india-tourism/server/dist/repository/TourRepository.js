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
const BaseRepository_1 = require("./BaseRepository");
class TourRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(tours_1.ToursModel);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return tours_1.ToursModel.findById(id).exec();
        });
    }
    aggregatePlannedTours(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield tours_1.ToursModel.aggregate([
                {
                    $match: query
                },
                {
                    $addFields: {
                        customStartDate: {
                            $dateToString: {
                                format: "%d-%B-%Y",
                                date: "$startDate",
                                timezone: "Asia/Kolkata"
                            }
                        },
                        customEndDate: {
                            $dateToString: {
                                format: "%d-%B-%Y",
                                date: "$endDate",
                                timezone: "Asia/Kolkata"
                            }
                        },
                        lengthOfTour: {
                            $dateDiff: {
                                startDate: "$startDate",
                                endDate: "$endDate",
                                unit: "day",
                                timezone: "Asia/Kolkata", // Optional
                            }
                        }
                    },
                },
            ]).exec();
            //  const result = await ToursModel.aggregate(pipelines);
            console.log("Aggregation Result:", result);
            return result;
        });
    }
}
exports.TourRepository = TourRepository;

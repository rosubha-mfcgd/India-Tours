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
exports.UserbookingRepository = void 0;
const userBookings_1 = require("../model/userBookings");
const BaseRepository_1 = require("./BaseRepository");
class UserbookingRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(userBookings_1.UserBookingModel);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return userBookings_1.UserBookingModel.findById(id).exec();
        });
    }
}
exports.UserbookingRepository = UserbookingRepository;

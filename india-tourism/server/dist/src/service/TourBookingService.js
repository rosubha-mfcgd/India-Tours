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
const { BookingRepository } = require('../repository/BookingRepository');
require("../logNginx");
const apputil = require('../utils/appUtility');
class TourBookingService {
    constructor() {
        this.errorMsg = "Message not found";
    }
    createOrUpdateBookings(tourManagerId, locationName, startDate, endDate, domesticOrInternational, package_cost, primarybookings, dependantbookings) {
        return __awaiter(this, void 0, void 0, function* () {
            let bookings = [];
            let bookingId = '';
            try {
                const bookingRepository = new BookingRepository();
                let existingBooking = yield bookingRepository.findOne({ "tourManagerId": tourManagerId,
                    "locationName": locationName,
                    "startDate": startDate,
                    "endDate": endDate,
                    "domesticOrInternational": domesticOrInternational });
                if (!existingBooking) {
                    bookingId = apputil.generateBookingId();
                    let data = { "tourManagerId": tourManagerId,
                        "locationName": locationName,
                        "startDate": startDate,
                        "endDate": endDate,
                        "domesticOrInternational": domesticOrInternational,
                        "bookingId": bookingId,
                        "package_cost": package_cost,
                        "primarybookings": primarybookings,
                        "dependantbookings": dependantbookings
                    };
                    bookings = yield bookingRepository.create(data);
                    console.log('User successfully booked with object id ', bookings._id);
                    if (bookings && bookings.length > 0) {
                        console.log('bookings...', bookings);
                    }
                }
                else {
                    console.log('User successfully booked with object id ', existingBooking._id);
                    if (existingBooking && existingBooking.length > 0) {
                        console.log('bookings...', existingBooking);
                        bookingId = existingBooking.bookingId;
                    }
                }
            }
            catch (err) {
                console.log(err.stack);
                logNginx(err.stack);
            }
            return bookingId;
        });
    }
}
module.exports = TourBookingService;

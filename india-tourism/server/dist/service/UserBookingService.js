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
const { UserbookingRepository } = require('../repository/UserbookingRepository');
require("../logNginx");
const apputil = require('../utils/appUtility');
class UserBookingService {
    constructor() {
        this.errorMsg = "Message not found";
    }
    createUserBookings(startDate, endDate, fromLocation, destLocation, hotelType, travelMode, touristData, status) {
        return __awaiter(this, void 0, void 0, function* () {
            let bookings = [];
            let bookingId = '';
            try {
                const userbookingRepository = new UserbookingRepository();
                bookingId = apputil.generateBookingId();
                let data = { "startDate": new Date(startDate),
                    "endDate": new Date(endDate),
                    "fromLocation": fromLocation,
                    "destLocation": destLocation,
                    "bookingId": bookingId,
                    "status": status,
                    "hotelType": hotelType,
                    "travelMode": travelMode,
                    "touristData": touristData
                };
                bookings = yield userbookingRepository.create(data);
                console.log('User successfully booked with object id ', bookings);
                if (bookings) {
                    console.log('bookings...', bookings);
                    bookingId = bookings.bookingId;
                }
            }
            catch (err) {
                console.log(err.stack);
                logNginx(err.stack);
            }
            return bookingId;
        });
    }
    getBookingsByBookingId(startDate, endDate, fromLocation, destLocation, bookingid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingRepository = new BookingRepository();
                console.log("startDate...", startDate);
                console.log("endDate...", endDate);
                console.log("bookingid...", bookingid);
                console.log("fromLocation...", fromLocation);
                console.log("destLocation...", destLocation);
                let existingBooking = yield bookingRepository.findOne({ "tourManagerId": tourManagerId,
                    "fromLocation": fromLocation,
                    "destLocation": destLocation,
                    $expr: {
                        $eq: [
                            { $dateTrunc: { date: "$startDate", unit: "day" } },
                            { $dateTrunc: { date: new Date(startDate), unit: "day" } },
                        ],
                        $eq: [
                            { $dateTrunc: { date: "$endDate", unit: "day" } },
                            { $dateTrunc: { date: new Date(endDate), unit: "day" } },
                        ]
                    },
                    "bookingId": bookingid
                });
                if (!existingBooking) {
                    console.log('Booking is not found for booking id:-', bookingid);
                    return null;
                }
                else {
                    console.log('User booking successfully with object id ', existingBooking._id);
                    if (existingBooking) {
                        console.log('bookings...', existingBooking);
                        return existingBooking;
                    }
                }
            }
            catch (err) {
                console.log(err.stack);
                logNginx(err.stack);
            }
            return null;
        });
    }
}
module.exports = UserBookingService;

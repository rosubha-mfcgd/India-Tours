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
const { BookingRepository } = require('../../dist/repository/BookingRepository');
const { TourRepository } = require('../../dist/repository/TourRepository');
const { mongoose } = require("mongoose");
require("../logNginx");
const apputil = require('../utils/appUtility');
class TourBookingService {
    constructor() {
        this.errorMsg = "Message not found";
    }
    createBookings(tourManagerId, tourid, locationName, startDate, endDate, domesticOrInternational, package_cost, primarybookings, dependantbookings) {
        return __awaiter(this, void 0, void 0, function* () {
            let bookings = [];
            let bookingId = '';
            if (!tourManagerId || !tourid) {
                return null;
            }
            const session = yield mongoose.startSession();
            try {
                yield session.withTransaction(() => __awaiter(this, void 0, void 0, function* () {
                    console.log('session...', session);
                    console.log('details...', tourManagerId, tourid, locationName, startDate, endDate, domesticOrInternational, package_cost, primarybookings, dependantbookings);
                    let personCount = primarybookings.length + dependantbookings.length;
                    const bookingRepository = new BookingRepository();
                    const tourRepository = new TourRepository();
                    bookingId = apputil.generateBookingId();
                    let data = { "tourOperatorId": Number(tourManagerId),
                        "tourId": tourid,
                        "locationName": locationName,
                        "startDate": new Date(startDate),
                        "endDate": new Date(endDate),
                        "domesticOrInternational": domesticOrInternational,
                        "bookingId": bookingId,
                        "package_cost": package_cost,
                        "amountPaid": package_cost,
                        "persons": personCount,
                        "primarybookings": primarybookings,
                        "dependantbookings": dependantbookings
                    };
                    console.log('transaction created....', data);
                    bookings = yield bookingRepository.create(data);
                    if (bookings) {
                        console.log('User successfully booked with object id ', bookings);
                        console.log('bookings...', bookings);
                        bookingId = bookings.bookingId;
                        const tour = yield tourRepository.findOne({ "_id": tourid });
                        if (tour) {
                            console.log('tour found....', tour);
                            let resultTour = yield tourRepository.update(tourid, { "seatsLeft": (Number(tour.seatsLeft) - Number(personCount)).toString() });
                            if (resultTour) {
                                let updateTour = yield tourRepository.findOne({ "_id": tourid });
                                if (updateTour) {
                                    console.log('updated seats...', updateTour.seatsLeft);
                                }
                            }
                        }
                    }
                }));
                console.log('Booking process completed successfully.');
            }
            catch (err) {
                console.log(err.stack);
                logNginx(err.stack);
                // 5. Abort the transaction if any error occurs
            }
            finally {
                // 6. End the session
                session.endSession();
                console.log('Session ended.');
            }
            return bookingId;
        });
    }
    createBookingsByMobile(tourManagerId, locationName, startDate, endDate, domesticOrInternational, package_cost, bookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            let bookings = [];
            let bookingId = '';
            try {
                const bookingRepository = new BookingRepository();
                bookingId = apputil.generateBookingId();
                let data = { "tourManagerId": tourManagerId,
                    "locationName": locationName,
                    "startDate": new Date(startDate),
                    "endDate": new Date(endDate),
                    "domesticOrInternational": domesticOrInternational,
                    "bookingId": bookingId,
                    "package_cost": package_cost,
                    "bookings": bookingData
                };
                bookings = yield bookingRepository.create(data);
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
    getBookingsByBookingId(tourManagerId, locationName, startDate, endDate, domesticOrInternational, bookingid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingRepository = new BookingRepository();
                console.log("startDate...", startDate);
                console.log("endDate...", endDate);
                console.log("bookingid...", bookingid);
                console.log("domesticOrInternational...", domesticOrInternational);
                console.log("tourManagerId...", tourManagerId);
                let existingBooking = yield bookingRepository.findOne({ "bookingId": bookingid });
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
    updateBookingsByBookingId(existingbooking, package_cost, primarybookings, dependantbookings) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = null;
            const bookingRepository = new BookingRepository();
            try {
                let data = { "package_cost": package_cost,
                    "primarybookings": primarybookings,
                    "dependantbookings": dependantbookings };
                let updateResult = yield bookingRepository.update(existingbooking._id, data);
                if (updateResult) {
                    console.log('booking....', result);
                    result = yield bookingRepository.findOne({ bookingId: existingbooking.bookingId });
                }
            }
            catch (err) {
                console.log(err.stack);
                logNginx(err.stack);
            }
            return result;
        });
    }
}
module.exports = TourBookingService;

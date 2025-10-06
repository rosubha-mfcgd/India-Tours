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
const TourBookingService = require('../service/TourBookingService');
require("../logNginx");
const performBookings = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    const { tourManagerId, locationName, startDate, endDate, domesticOrInternational, package_cost, primarybookings, dependantbookings } = req.body;
    try {
        let tourBookingService = new TourBookingService();
        let bookings = yield tourBookingService.createBookings(tourManagerId, locationName, startDate, endDate, domesticOrInternational, package_cost, primarybookings, dependantbookings);
        if (bookings) {
            console.log('bookings...', bookings);
            res.status(200).send({ "bookingid": bookings });
        }
        else {
            throw err;
        }
    }
    catch (err) {
        if (retries > 0) {
            console.log('retry attempted...');
            yield new Promise(resolve => setTimeout(resolve, delay));
            return performBookings(req, res, retries - 1, delay);
        }
        logNginx(err.stack);
        res.status(400).send({ "errormessage": "could not create a booking" });
    }
});
const getBookingsByBookingId = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    const { tourManagerId, locationName, startDate, endDate, domesticOrInternational, bookingId } = req.body;
    try {
        let tourBookingService = new TourBookingService();
        let bookings = yield tourBookingService.getBookingsByBookingId(tourManagerId, locationName, startDate, endDate, domesticOrInternational, bookingId);
        if (bookings) {
            res.status(200).send(bookings);
        }
        else {
            res.status(200).send({
                "errormessage": "could not find a booking by booking id " + bookingId
            });
        }
    }
    catch (err) {
        if (retries > 0) {
            console.log('retry attempted...');
            yield new Promise(resolve => setTimeout(resolve, delay));
            return getBookingsByBookingId(req, res, retries - 1, delay);
        }
        logNginx(err.stack);
        res.status(400).send({ "errormessage": "could not find a booking by booking id " + bookingId });
    }
});
const updateBookingsByBookingId = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    const { tourManagerId, locationName, startDate, endDate, domesticOrInternational, bookingId, package_cost, primarybookings, dependantbookings } = req.body;
    try {
        let tourBookingService = new TourBookingService();
        console.log('bookingId ...'.bookingId);
        let bookingsFromDB = yield tourBookingService.getBookingsByBookingId(tourManagerId, locationName, startDate, endDate, domesticOrInternational, bookingId);
        if (bookingsFromDB) {
            let updatedbookings = yield tourBookingService.updateBookingsByBookingId(bookingsFromDB, package_cost, primarybookings, dependantbookings);
            if (updatedbookings) {
                res.status(200).send(updatedbookings);
            }
            else {
                console.log('could not update bookings....');
                throw err;
            }
        }
        else {
            console.log('could not find booking by booking id');
            throw err;
        }
    }
    catch (err) {
        if (retries > 0) {
            console.log('retry attempted...');
            yield new Promise(resolve => setTimeout(resolve, delay));
            return updateBookingsByBookingId(req, res, retries - 1, delay);
        }
        logNginx(err.stack);
        res.status(400).send({ "errormessage": "could not update booking by bookingId " + bookingId });
    }
});
module.exports = { performBookings, getBookingsByBookingId, updateBookingsByBookingId };

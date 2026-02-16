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
const UserBookingService = require('../service/UserBookingService');
const TourDetailService = require('../service/TourDetailService');
require("../logNginx");
//Creates a booking record for a list of tourists
const performBookings = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    const { tourManagerId, tourid, locationName, startDate, endDate, domesticOrInternational, package_cost, primarybookings, dependantbookings } = req.body;
    console.log('req body....', req.body);
    try {
        let tourOperatorId = null;
        let tourBookingService = new TourBookingService();
        if (!tourManagerId) {
            console.log('cannot find tourmanager id, searching by tourid...', tourid);
            let tourDetailsDService = new TourDetailService();
            let tourDetails = yield tourDetailsDService.getTourByTourId(tourid);
            if (tourDetails) {
                tourOperatorId = tourDetails.tourOperator;
            }
            console.log('tour Operator Id....', tourOperatorId);
        }
        if (tourManagerId || tourOperatorId) {
            let bookings = yield tourBookingService.createBookings(tourManagerId ? tourManagerId : tourOperatorId, tourid, locationName, startDate, endDate, domesticOrInternational, package_cost, primarybookings, dependantbookings);
            if (bookings) {
                console.log('bookings...', bookings);
                res.status(200).send({ "bookingid": bookings });
            }
            else {
                res.status(400).send({ "errormessage": "could not create a booking" });
            }
        }
        else {
            res.status(400).send({ "errormessage": "could not find touroperator" });
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
//Creates a booking record for a list of tourists from mobile app
const performBookingsByMobile = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    const { tourManagerId, locationName, startDate, endDate, domesticOrInternational, package_cost, bookingData } = req.body;
    try {
        let tourBookingService = new TourBookingService();
        let bookings = yield tourBookingService.createBookingsByMobile(tourManagerId, locationName, startDate, endDate, domesticOrInternational, package_cost, bookingData);
        if (bookings) {
            console.log('bookings...', bookings);
            res.status(200).send({ "bookingid": bookings });
        }
        else {
            throw new Error("could not create a booking on attempt #:-", retries);
        }
    }
    catch (err) {
        if (retries > 0) {
            console.log('retry attempted...');
            yield new Promise(resolve => setTimeout(resolve, delay));
            return performBookingsByMobile(req, res, retries - 1, delay);
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
            let responseData = null;
            let result = [];
            for (let primarybooking of bookings.primarybookings) {
                responseData = Object.assign(Object.assign({}, responseData), { "name": primarybooking.name, "mobile": primarybooking.mobile, "email": primarybooking.email, "ageGroup": primarybooking.ageGroup, "gender": primarybooking.gender });
            }
            if (responseData) {
                result.push(responseData);
            }
            for (let dependantbooking of bookings.dependantbookings) {
                responseData = Object.assign(Object.assign({}, responseData), { "name": dependantbooking.name, "mobile": dependantbooking.mobile, "email": dependantbooking.email, "ageGroup": dependantbooking.ageGroup, "gender": dependantbooking.gender });
            }
            if (responseData) {
                result.push(responseData);
            }
            console.log('result.....', result);
            res.status(200).send(result);
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
//Update bookings by booking id
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
                throw new Error("could not update a booking on attempt #:-", retries);
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
const performUserBookings = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    const { startDate, endDate, fromLocation, destLocation, touristData, travelMode, hotelType, status } = req.body;
    try {
        if (touristData && touristData.length === 0) {
            res.status(200).send({ "errorDetails": "No tourists found" });
        }
        else {
            let userBookingService = new UserBookingService();
            let bookings = yield userBookingService.createUserBookings(startDate, endDate, fromLocation, destLocation, hotelType, travelMode, touristData, status);
            if (bookings) {
                console.log('bookings...', bookings);
                res.status(200).send({ "bookingid": bookings });
            }
            else {
                throw new Error("could not create a booking on attempt #:-", retries);
            }
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
module.exports = { performBookings, performBookingsByMobile, getBookingsByBookingId,
    updateBookingsByBookingId, performUserBookings };

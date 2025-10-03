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
const performBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tourManagerId, locationName, startDate, endDate, domesticOrInternational, package_cost, primarybookings, dependantbookings } = req.body;
    try {
        let tourBookingService = new TourBookingService();
        let bookings = yield tourBookingService.createOrUpdateBookings(tourManagerId, locationName, startDate, endDate, domesticOrInternational, package_cost, primarybookings, dependantbookings);
        res.status(200).send({ "bookingid": bookings });
    }
    catch (err) {
        logNginx(err.stack);
        res.status(400).send({ "errormessage": "could not find any tour operators" });
    }
});
module.exports = { performBookings };

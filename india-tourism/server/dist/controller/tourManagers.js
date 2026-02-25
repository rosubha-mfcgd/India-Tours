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
require("../logNginx");
const TourDetailService = require('../service/TourDetailService');
const UserService = require('../service/UserService');
const ReviewService = require('../service/ReviewService');
const getRegisteredTourManagers = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    try {
        let tourManagers = yield new UserService().getRegisteredTourOperators();
        if (tourManagers) {
            console.log('tourManagers..', tourManagers);
            res.status(200).send(tourManagers);
        }
    }
    catch (err) {
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return getRegisteredTourManagers(req, res, retries - 1, delay);
        }
        logNginx(err.stack);
        res.status(400).send({ "errormessage": "could not find any tour operators" });
    }
});
const getCities = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    try {
        let cities = yield new TourDetailService().getCities();
        if (cities) {
            console.log('cities..', cities);
            res.status(200).send(cities);
        }
    }
    catch (err) {
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return getCities(req, res, retries - 1, delay);
        }
        logNginx(err.stack);
        res.status(400).send({ "errormessage": "could not find any cities" });
    }
});
const getOperatorReviews = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    let { tourManagerId, reviewDate } = req.body;
    try {
        let operatorReviews = yield new ReviewService().getReviews(tourManagerId, reviewDate);
        if (operatorReviews) {
            console.log('operatorReviews..', operatorReviews);
            res.status(200).send(operatorReviews);
        }
    }
    catch (err) {
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return getOperatorReviews(req, res, retries - 1, delay);
        }
        logNginx(err.stack);
        res.status(400).send({ "errormessage": "could not find any reviews" });
    }
});
module.exports = { getRegisteredTourManagers, getCities, getOperatorReviews };

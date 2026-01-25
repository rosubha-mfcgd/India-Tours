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
const TourDetailService = require('../service/TourDetailService');
const { tourOperatorCache } = require('../utils/cacheMap');
require("../logNginx");
//Get list of categories
const getCategories = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    try {
        let parameters = req.query;
        let productID = parameters.productID;
        let categories = yield new TourDetailService().getCategories(productID);
        if (categories) {
            console.log('result..', categories);
            res.status(200).send(categories);
        }
    }
    catch (err) {
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return getCategories(req, res, retries - 1, delay);
        }
        res.status(400).send({ "errormessage": "could not load categories" });
    }
});
//Get list of products
const getProducts = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    try {
        let products = yield new TourDetailService().getProducts();
        if (products) {
            console.log('result..', products);
            if (products) {
                res.status(200).send(products);
            }
            else {
                throw new Error("could not get the product on attempt #:-", retries);
            }
        }
    }
    catch (err) {
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return getProducts(req, res, retries - 1, delay);
        }
        res.status(400).send({ "errormessage": "could not load products" });
    }
});
const updateFavoriteCategory = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    try {
        let { categoryId, status } = req.body;
        let result = yield new TourDetailService().updateCategoryAsFavorite(categoryId, status);
        if (result) {
            let data = { "categoryId": categoryId, "isUpdated": false };
            console.log('result in controller...', result);
            if (status === result.favorite) {
                data = { "categoryId": categoryId, "isUpdated": true };
            }
            res.status(201).send(data);
        }
    }
    catch (err) {
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return updateFavoriteCategory(req, res, retries - 1, delay);
        }
        res.status(400).send({ "errormessage": "could not update categories" });
    }
});
//Get recommended tours
const getRecommendedTours = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    try {
        let plannedTours = yield new TourDetailService().getRecommendedTours();
        if (plannedTours) {
            console.log('result..', plannedTours);
            for (let plannedTour of plannedTours) {
                let tourmanagerid = plannedTour.tourOperator;
                const tourManager = tourOperatorCache.get(tourmanagerid);
                if (tourManager) {
                    plannedTour.tourOperator = tourManager;
                    plannedTour.tourOperator.tourManagerName = tourManager.firstName + '-' + tourManager.lastName;
                }
            }
            res.status(200).send(plannedTours);
        }
    }
    catch (err) {
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return getRecommendedTours(req, res, retries - 1, delay);
        }
        res.status(400).send({ "errormessage": "could not load any planned Tours by any operator" });
    }
});
//Get tours by category id - 1-Hill station, 2- Sea beach
const getToursByCategoryId = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    try {
        const parameters = req.query;
        const categoryId = parameters.categoryId;
        console.log('category id is....', categoryId);
        let plannedTours = yield new TourDetailService().getToursByCategoryId(categoryId);
        if (plannedTours) {
            console.log('result..', plannedTours);
            res.status(200).send(plannedTours);
        }
    }
    catch (err) {
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return getToursByCategoryId(req, res, retries - 1, delay);
        }
        res.status(400).send({ "errormessage": "could not load any planned Tours by any operator" });
    }
});
const getTourItenerariesForTrip = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    try {
        let { locationName, categoryID, tourManagerId, startDate, endDate } = req.body;
        //const parameters = req.query;
        console.log('request params is....', locationName, categoryID, tourManagerId, startDate, endDate);
        let itineraries = yield new TourDetailService().getTourItenriesForTrip(locationName, categoryID, tourManagerId, startDate, endDate);
        if (itineraries) {
            console.log('result..', itineraries);
            res.status(200).send(itineraries);
        }
        else {
            res.status(400).send({ "errormessage": "could not find tour itineraries" });
        }
    }
    catch (err) {
        console.log(err.stack);
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return getTourItenerariesForTrip(req, res, retries - 1, delay);
        }
        res.status(400).send({ "errormessage": "could not load any planned Tours by any operator" });
    }
});
//Get list of tour operators
const getTourManagers = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    try {
        //   const parameters = req.query;
        const tourManagers = [...tourOperatorCache.values()];
        if (tourManagers) {
            console.log('result..', tourManagers);
            res.status(200).send(tourManagers);
        }
    }
    catch (err) {
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return getTourManagers(req, res, retries - 1, delay);
        }
        res.status(500).send({ "errormessage": "could not load any planned operators" });
    }
});
const getTourManagerById = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    const { tourManagerId } = req.body;
    try {
        const { tourManagerId } = req.body;
        //   const parameters = req.query;
        const tourManager = tourOperatorCache.get(tourManagerId);
        if (tourManager) {
            console.log('result..', tourManager);
            res.status(200).send(tourManager);
        }
    }
    catch (err) {
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return getTourManagerById(req, res, retries - 1, delay);
        }
        res.status(500).send({ "errormessage": "could not find planned operator for operator id ", tourManagerId });
    }
});
module.exports = { getCategories, getToursByCategoryId, updateFavoriteCategory,
    getProducts, getTourManagers, getTourItenerariesForTrip, getRecommendedTours };

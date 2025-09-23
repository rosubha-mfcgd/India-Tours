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
require("../logNginx");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let categories = yield new TourDetailService().getCategories();
        if (categories) {
            console.log('result..', categories);
            res.status(200).send(categories);
        }
    }
    catch (err) {
        res.status(400).send({ "errormessage": "could not load categories" });
    }
});
const updateFavoriteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.status(400).send({ "errormessage": "could not update categories" });
    }
});
const getToursByCategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.status(400).send({ "errormessage": "could not load any planned Tours by any operator" });
    }
});
const getTourManagers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   const parameters = req.query;
        const categoryId = parameters.categoryId;
        console.log('category id is....', categoryId);
        let plannedTours = yield new TourDetailService().getToursByCategoryId(categoryId);
        if (plannedTours) {
            console.log('result..', plannedTours);
            res.status(200).send(plannedTours);
        }
    }
    catch (err) {
        res.status(400).send({ "errormessage": "could not load any planned Tours by any operator" });
    }
});
module.exports = { getCategories, getToursByCategoryId, updateFavoriteCategory };

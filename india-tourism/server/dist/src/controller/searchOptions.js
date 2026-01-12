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
const TaskOperationService = require('../service/TaskOperationService');
const PreferenceService = require('../service/PreferenceService');
require("../logNginx");
const getSearchOptions = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    try {
        let parameters = req.query;
        let productID = parameters.productID;
        let categoryID = parameters.categoryID;
        console.log('product ID...', productID);
        console.log('category ID...', categoryID);
        let options = yield new TaskOperationService().getAllOptions(productID, categoryID);
        if (options) {
            console.log('result..', options);
            res.status(200).send(options);
        }
    }
    catch (err) {
        if (retries > 0) {
            console.log('retry attempted...');
            yield new Promise(resolve => setTimeout(resolve, delay));
            return getSearchOptions(req, res, retries - 1, delay);
        }
        logNginx(err.stack);
        res.status(400).send({ "errormessage": "could not load options for productid " + productID + " and categoryid " + categoryID });
    }
});
const getPreferences = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    try {
        let preferences = yield new PreferenceService().getPreferences();
        if (preferences && preferences.length) {
            console.log('preferences retrieved....', preferences);
            res.status(200).send(preferences);
        }
        else if (!preferences) {
            res.status(200).send([]);
        }
    }
    catch (err) {
        if (retries > 0) {
            console.log('retry attempted...');
            yield new Promise(resolve => setTimeout(resolve, delay));
            return getPreferences(req, res, retries - 1, delay);
        }
        logNginx(err.stack);
        res.status(400).send({ "errormessage": "could not load preferences" });
    }
});
module.exports = { getSearchOptions, getPreferences };

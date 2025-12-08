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
const UserService = require('../service/UserService');
require("../logNginx");
const getPoints = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    try {
        let { email, mobile } = req.body;
        let points = yield new UserService().getPoints(email, mobile);
        if (points) {
            res.status(200).send({ "points": points, "mobile": req.body.mobile, "name": req.body.name, "email": req.body.email });
        }
    }
    catch (error) {
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return getPoints(req, res, retries - 1, delay);
        }
        res.status(400).send({ "points": "N/A", "mobile": req.body.mobile, "name": req.body.name, "email": req.body.email });
    }
});
const findUser = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    let { email, mobile, access_token } = req.body;
    try {
        if (access_token) {
            let result = yield new UserService().findUser(email, mobile);
            if (result) {
                res.status(200).send({ "name": result.name, "mobile": result.mobile,
                    "emailID": result.emailID });
            }
        }
    }
    catch (error) {
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return findUser(req, res, retries - 1, delay);
        }
        res.status(400).send({ "error": "User not found" });
    }
});
const updateProfile = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    let { email, mobile, prefs, address, city, zipcode, access_token } = req.body;
    try {
        if (access_token) {
            let result = yield new UserService().updateUserDetails(email, mobile, prefs, address, city, zipcode);
            if (result) {
                res.status(200).send({ "name": result.name, "mobile": result.mobile, "emailID": result.emailID });
            }
            else {
                res.status(400).send({ "error": "Profile could not be updated, try again" });
            }
        }
    }
    catch (err) {
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return updateProfile(req, res, retries - 1, delay);
        }
        res.status(400).send({ "error": "Profile could not be updated, try again" });
    }
});
module.exports = { getPoints, findUser, updateProfile };

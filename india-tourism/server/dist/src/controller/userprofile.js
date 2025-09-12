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
const getPoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, mobile } = req.body;
        let points = yield new UserService().getPoints(email, mobile);
        if (points) {
            res.status(200).send({ "points": points, "mobile": req.body.mobile, "name": req.body.name, "email": req.body.email });
        }
    }
    catch (error) {
        res.status(400).send({ "points": "N/A", "mobile": req.body.mobile, "name": req.body.name, "email": req.body.email });
    }
});
module.exports = { getPoints };

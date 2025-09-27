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
const express = require('express');
const session = require('express-session');
require("../logNginx");
const TourDetailService = require('../service/TourDetailService');
const getRegisteredTourManagers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tourManagers = yield new TourDetailService().getTourManagers();
        if (tourManagers) {
            console.log('tourManagers..', tourManagers);
            changeDateToWords;
            res.status(200).send(tourManagers);
        }
    }
    catch (err) {
        logNginx(err.stack);
        res.status(400).send({ "errormessage": "could not find any tour operators" });
    }
});
module.exports = { getRegisteredTourManagers };

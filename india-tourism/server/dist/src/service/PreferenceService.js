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
const { PreferenceRepository } = require('../../dist/repository/PreferenceRepository');
require("../logNginx");
class PreferenceService {
    constructor() {
        this.errorMsg = "Message not found";
    }
    getPreferences() {
        return __awaiter(this, void 0, void 0, function* () {
            let preferences = [];
            const preferenceRepo = new PreferenceRepository();
            try {
                //   console.log('productID....',productID)
                // console.log('categoryID....',categoryID)
                preferences = yield preferenceRepo.find({});
                if (preferences && preferences.length > 0) {
                    console.log('preferences...', preferences);
                    return preferences;
                }
            }
            catch (err) {
                logNginx(err.stack);
                console.log(err.stack);
            }
            return [];
        });
    }
}
module.exports = PreferenceService;

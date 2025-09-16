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
const { CategoryRepository } = require('../../dist/repository/CategoryRepository');
require("../logNginx");
class TourDetailService {
    constructor() {
        this.errorMsg = "Message not found";
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            let categories = [];
            try {
                const categoryRepo = new CategoryRepository();
                categories = yield categoryRepo.findAll();
                if (categories && categories.length > 0) {
                    console.log('categories...', categories);
                }
            }
            catch (err) {
                console.log(err.stack);
                logNginx(err.stack);
            }
            return categories;
        });
    }
}
module.exports = TourDetailService;

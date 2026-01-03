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
const { SearchOptionsRepository } = require('../../dist/repository/SearchOptionsRepository');
require("../logNginx");
class TaskOperationService {
    constructor() {
        this.errorMsg = "Message not found";
    }
    getAllOptions(productID, categoryID) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = [];
            try {
                const searchOptionsRepo = new SearchOptionsRepository();
                console.log('productID....', productID);
                console.log('categoryID....', categoryID);
                options = yield searchOptionsRepo.findAllSortedResultsByParams({
                    "productID": Number(productID),
                    "categoryID": Number(categoryID)
                }, { favorite: -1 });
                if (options && options.length > 0) {
                    console.log('options...', options);
                }
            }
            catch (err) {
                // console.log(err.stack);
                logNginx(err.stack);
            }
            return options;
        });
    }
}
module.exports = TaskOperationService;

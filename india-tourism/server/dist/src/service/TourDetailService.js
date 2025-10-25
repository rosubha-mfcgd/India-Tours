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
const { TourRepository } = require('../repository/TourRepository');
const { TourManagerRepository } = require('../repository/TourManagerRepository');
const { ProductRepository } = require('../../dist/repository/ProductRepository');
const { CityRepository } = require('../../dist/repository/CityRepository');
const { BookingRepository } = require('../repository/BookingRepository');
require("../logNginx");
class TourDetailService {
    constructor() {
        this.errorMsg = "Message not found";
    }
    getCategories(productID) {
        return __awaiter(this, void 0, void 0, function* () {
            let categories = [];
            try {
                const categoryRepo = new CategoryRepository();
                console.log('productID....', productID);
                categories = yield categoryRepo.findAllSortedResultsByParams({ "productID": Number(productID) }, { favorite: -1 });
                if (categories && categories.length > 0) {
                    console.log('categories...', categories);
                }
            }
            catch (err) {
                // console.log(err.stack);
                logNginx(err.stack);
            }
            return categories;
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            let products = [];
            try {
                const productRepo = new ProductRepository();
                products = yield productRepo.findAllSortedResults({ favorite: -1 });
                if (products && products.length > 0) {
                    console.log('products...', products);
                }
            }
            catch (err) {
                logNginx(err.stack);
            }
            return products;
        });
    }
    updateCategoryAsFavorite(categoryId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            let categories = '';
            let result = '';
            try {
                const categoryRepo = new CategoryRepository();
                console.log('category Id ...', categoryId);
                categories = yield categoryRepo.findOne({ categoryID: categoryId });
                if (categories) {
                    console.log('categories....', categories);
                    result = yield categoryRepo.update(categories._id, { favorite: status });
                    if (result) {
                        // console.log('categories with favorite....',JSON.stringify(result));
                        result = yield categoryRepo.findOne({ categoryID: categoryId });
                    }
                }
            }
            catch (err) {
                logNginx(err.stack);
            }
            return result;
        });
    }
    getToursByCategoryId(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            let plannedTours = [];
            try {
                const tourRepository = new TourRepository();
                plannedTours = yield tourRepository.find({ "categoryID": Number(categoryId), "startDate": { $gt: new Date() } });
                if (plannedTours && plannedTours.length > 0) {
                    console.log('plannedTours...', plannedTours);
                }
            }
            catch (err) {
                console.log(err.stack);
                logNginx(err.stack);
            }
            return plannedTours;
        });
    }
    getTourManagers() {
        return __awaiter(this, void 0, void 0, function* () {
            let tourOperators = [];
            try {
                const tourMgrRepository = new TourManagerRepository();
                tourOperators = yield tourMgrRepository.find({});
                if (tourOperators && tourOperators.length > 0) {
                    console.log('tourOperators...', tourOperators);
                }
            }
            catch (err) {
                console.log(err.stack);
                logNginx(err.stack);
            }
            return tourOperators;
        });
    }
    getCities() {
        return __awaiter(this, void 0, void 0, function* () {
            let cities = [];
            try {
                const cityRepository = new CityRepository();
                cities = yield cityRepository.find({});
                if (cities && cities.length > 0) {
                    console.log('cities...', cities);
                }
            }
            catch (err) {
                console.log(err.stack);
                logNginx(err.stack);
            }
            return cities;
        });
    }
}
module.exports = TourDetailService;

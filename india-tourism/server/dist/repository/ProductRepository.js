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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const product_1 = require("../model/product");
const BaseRepository_1 = require("./BaseRepository");
class ProductRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(product_1.ProductModel);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return product_1.ProductModel.findById(id).exec();
        });
    }
}
exports.ProductRepository = ProductRepository;

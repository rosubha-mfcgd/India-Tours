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
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this._model = model;
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = null;
            try {
                return yield this._model.create(item);
            }
            catch (err) {
                console.error(err);
            }
            return null;
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._model.updateOne({ _id: id }, item);
            console.log('result count...', result.modifiedCount);
            return this._model;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._model.deleteOne({ _id: id });
            return result.deletedCount > 0;
        });
    }
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.find(query).exec();
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.findOne(query).exec();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.find({}).exec();
        });
    }
    findAllSortedResults(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.find().sort(query).exec();
        });
    }
    findAllSortedResultsByParams(query, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.find(query).sort(filter).exec();
        });
    }
}
exports.BaseRepository = BaseRepository;

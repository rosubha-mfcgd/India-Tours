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
require("../logNginx");
require("dotenv").config();
class UploadDocumentService {
    constructor() {
        this.errorMsg = "Message not found";
    }
    uploadAdharDocs(fullNamw, file, yearofbirth) {
        return __awaiter(this, void 0, void 0, function* () {
            let docUploadURL = process.env.IDENTITY_DOC_UPLOAD_URL;
            let bearerToken = process.env.IDENTITY_DOC_UPLOAD_API_TOKEN;
            try {
            }
            catch (err) {
                console.log(err.stack);
                logNginx(err.stack);
            }
            return reviews;
        });
    }
}
module.exports = UploadDocumentService;

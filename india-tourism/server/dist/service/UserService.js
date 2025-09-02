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
const { UserRepository } = require('../../dist/repository/UserRepository');
const constants = require("../utils/constants");
require("../logNginx");
class UserService {
    constructor() {
        this.errorMsg = "Message not found";
    }
    signupUser(email, mobile, name, signUpOTP) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepo = new UserRepository();
                let user = yield userRepo.findOne({ "emailID": email, "mobile": mobile, "name": name });
                if (!user) {
                    console.log('Creating user entity..');
                    user = yield userRepo.create({ "emailID": email, "mobile": mobile, "name": name, "signedUpFlag": "N",
                        "otp": signUpOTP
                    });
                    console.log('Signed up user successfully with object id ', user._id);
                    return constants.YES;
                }
                else {
                    console.log('User is signed up already');
                    return constants.EXISTS;
                }
            }
            catch (err) {
                logNginx(err.stack);
            }
        });
    }
    loginUser(email, mobile, loginOTP) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepo = new UserRepository();
                let user = yield userRepo.findOne({ "emailID": email, "mobile": mobile, "signedUpFlag": "Y" });
                if (user) {
                    user = yield userRepo.update(user._id, { "otp": loginOTP });
                    console.log(' user logged in successfully');
                    return constants.YES;
                }
                else {
                    console.log('Login failed');
                    return constants.NO;
                }
            }
            catch (err) {
                logNginx(err.stack);
            }
            console.log('Login failed');
            return constants.NO;
        });
    }
    validateOTP(email, mobile, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepo = new UserRepository();
                // console.log("Error message is...",this.errorMsg);
                let user = yield userRepo.findOne({ "emailID": email, "mobile": mobile, "otp": otp });
                console.log('user....', user);
                if (user) {
                    console.log('valid otp');
                    let _id = user._id;
                    console.log('Update signed up flag to Yes');
                    let user2 = yield userRepo.update(_id, { "signedUpFlag": "Y" });
                    if (user2) {
                        return constants.YES;
                    }
                    else {
                        console.log('failed to update status ...');
                        return constants.NO;
                    }
                }
                else {
                    console.log('invalid otp');
                    return constants.NO;
                }
            }
            catch (err) {
                logNginx(err.stack);
            }
        });
    }
}
module.exports = UserService;

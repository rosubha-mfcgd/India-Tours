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
const { TourOperatorRepository } = require('../../dist/repository/TourOperatorRepository');
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
                    user = yield userRepo.create({ "emailID": email, "mobile": mobile, "name": name,
                        "signedUpFlag": "N",
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
    updateLoginOTP(email, mobile, loginOTP) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepo = new UserRepository();
                let user = yield userRepo.findOne({ "emailID": email, "mobile": mobile });
                if (user) {
                    user = yield userRepo.update(user._id, { "otp": loginOTP });
                    console.log(' Login OTP updated successfully for user');
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
    updateUserDetails(email, mobile, prefs, address, city, zipcode) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = new UserRepository();
            try {
                let user = null;
                let strQuery = '';
                if (email && mobile) {
                    strQuery = { "emailID": email, "mobile": mobile, "signedUpFlag": "Y" };
                }
                else if (email) {
                    strQuery = { "emailID": email, "signedUpFlag": "Y" };
                }
                else if (mobile) {
                    strQuery = { "mobile": mobile, "signedUpFlag": "Y" };
                }
                else {
                    console.log('no search params found');
                }
                if (strQuery) {
                    user = yield userRepo.findOne(strQuery);
                    if (user) {
                        user = yield userRepo.update(user._id, { "preference": prefs,
                            "address1": address, "city": city, "zipcode": zipcode });
                        if (user) {
                            console.log(' Details updated successfully for user id...', user._id);
                        }
                        return user;
                    }
                }
            }
            catch (err) {
                console.log(err.stack);
                logNginx(err.stack);
            }
            return null;
        });
    }
    loginUser(email, mobile, loginOTP) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepo = new UserRepository();
                let queryStr = '';
                if (email && mobile) {
                    queryStr = { "emailID": email, "mobile": mobile, "signedUpFlag": "Y" };
                }
                else if (email && !mobile) {
                    queryStr = { "emailID": email, "signedUpFlag": "Y" };
                }
                else if (!email && mobile) {
                    queryStr = { "mobile": mobile, "signedUpFlag": "Y" };
                }
                else {
                    console.log('Login failed');
                    return constants.NO;
                }
                let user = yield userRepo.findOne(queryStr);
                if (user) {
                    user = yield userRepo.update(user._id, { "otp": loginOTP });
                    if (user) {
                        console.log('user logged in successfully');
                        return constants.YES;
                    }
                    else {
                        console.log('Login failed');
                        return constants.NO;
                    }
                }
                else {
                    console.log('User not signed up yet');
                    return constants.NO_USER_FOUND;
                }
            }
            catch (err) {
                logNginx(err.stack);
            }
        });
    }
    findUser(email, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepo = new UserRepository();
                let queryStr = '';
                if (email && mobile) {
                    queryStr = { "emailID": email, "mobile": mobile, "signedUpFlag": "Y" };
                }
                else if (email && !mobile) {
                    queryStr = { "emailID": email, "signedUpFlag": "Y" };
                }
                else if (!email && mobile) {
                    queryStr = { "mobile": mobile, "signedUpFlag": "Y" };
                }
                else {
                    console.log('No request parameters found');
                    return null;
                }
                let user = yield userRepo.findOne(queryStr);
                if (user) {
                    return user;
                }
            }
            catch (err) {
                logNginx(err.stack);
            }
        });
    }
    validateOTP(email, mobile, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepo = new UserRepository();
                let strQuery = '';
                if (!otp) {
                    console.log('invalid otp...');
                    return constants.NO;
                }
                if (email && mobile && otp) {
                    strQuery = { "emailID": email, "mobile": mobile, "otp": otp };
                }
                else if (email && otp) {
                    strQuery = { "emailID": email, "otp": otp };
                }
                else if (mobile && otp) {
                    strQuery = { "mobile": mobile, "otp": otp };
                }
                let user = yield userRepo.findOne(strQuery);
                if (user) {
                    console.log('user....', user);
                    console.log('valid otp');
                    let _id = user._id;
                    console.log('Update signed up flag to Yes');
                    let user2 = yield userRepo.update(_id, { $set: { "signedUpFlag": "Y" } });
                    if (user2) {
                        console.log('update status successfully for username ...', user.name);
                        return user.name;
                    }
                    else {
                        console.log('failed to update status ...');
                        return constants.NO;
                    }
                }
                else {
                    console.log('invalid otp...');
                    return constants.NO;
                }
            }
            catch (err) {
                logNginx(err.stack);
            }
        });
    }
    getPoints(email, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            let points = 0;
            try {
                const userRepo = new UserRepository();
                let user = yield userRepo.findOne({ "emailID": email, "mobile": mobile });
                if (user) {
                    console.log('found user profile...');
                    points = user.points;
                }
                else {
                    console.log('could not find user profile...');
                    points = 0;
                }
            }
            catch (err) {
                logNginx(err.stack);
            }
            return points;
        });
    }
    getRegisteredTourOperators() {
        return __awaiter(this, void 0, void 0, function* () {
            let operators = [];
            try {
                const tourOperatorRepository = new TourOperatorRepository();
                operators = yield tourOperatorRepository.find({ "roleID": { $in: [1, 2] } });
                if (operators) {
                    console.log('found user profile for operator...');
                    return operators;
                }
                else {
                    console.log('could not find user profile...');
                    return [];
                }
            }
            catch (err) {
                logNginx(err.stack);
            }
            return [];
        });
    }
}
module.exports = UserService;

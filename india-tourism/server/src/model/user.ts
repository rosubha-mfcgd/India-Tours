import { Schema, model } from 'mongoose';
import { IUser } from '../repository/TourEntityState';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  signedUpFlag: { type: String, required: true},
  mobile: { type: String },
  emailID:{ type: String },
  otp : { type: String },
  address1 : {type: String},
  address2 : {type: String},
  zipcode : {type: String},
  points : {type: Number},
  preference1 : {type: String},
  preference2 : {type: String},
  tourmanagerId : {type: String}
});

export const UserModel = model<IUser>('User', userSchema);
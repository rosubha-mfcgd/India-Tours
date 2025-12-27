import { Schema, model } from 'mongoose';
import {IUserBookings} from '../repository/AppEntityState';

const userBookingSchema = new Schema<IUserBookings>({
     
       	tourManagerId: {
			type: String
		},
    bookingId: {
      type: String,
			required: true
    },
		startDate: {
			type: Date,
			required: true
		},
		endDate: {
			type: Date,
			required: true
		},
		fromLocation: {
			type: String,
			required: true
		},
		destLocation: {
			type: String,
			required: true
		},
		package_cost: {
			type: Number,
			},
		touristData: {
			type: [],
			required: true
		},
    
		reviews: {
			type: []
		}});

export const UserBookingModel = model<IUserBookings>('UserBookings',userBookingSchema);
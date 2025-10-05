import { Schema, model } from 'mongoose';
import {ITourBookings} from '../repository/AppEntityState';

const tourBookingSchema = new Schema<ITourBookings>({
     
		tourManagerId: {
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
		bookingId: {
      	type: String,
			required: true
   		 },
		locationName: {
			type: String,
			required: true
		},
		domesticOrInternational: {
			type: String,
			required: true
		},
		package_cost: {
			type: Number,
			required: true
		},
		primarybookings: {
			type: [],
			required: true
		},
		dependantbookings: {
			type: [],
			required: true
		},
		reviews: {
			type: []
		}});

export const TourBookingModel = model<ITourBookings>('TourBookings',tourBookingSchema);
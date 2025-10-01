import { Schema, model } from 'mongoose';
import {ITourBookings} from '../repository/AppEntityState';

const tourBookingSchema = new Schema<ITourBookings>({
     _id: {
			primaryKey: true,
			type: Object,
			required: true
		},
		tourManagerId: {
			type: String,
			required: true
		},
		startDate: {
			type: String,
			required: true
		},
		endDate: {
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
			type: [],
			required: true
		}});

export const TourBookingModel = model<ITourBookings>('TourBookings',tourBookingSchema);
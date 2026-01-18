import { Schema, model } from 'mongoose';
import {ITourBookings} from '../repository/AppEntityState';

const tourBookingSchema = new Schema<ITourBookings>({
     
		tourOperatorId: {
        type: Number,
      	ref: "User",
      	required: true,
   		 },
		tourId: {
		type: Number,
		ref: "Tour",
		required: true,
    	},
		 persons: {
      		type: Number,
      		required: true,
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
	amountPaid: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    payment: {
      paymentId: String,
      status: String,
      cardLast4: String,
      method: {
        type: String,
        default: "card",
      },
    },

    status: {
      type: String,
      enum: ["CONFIRMED", "FAILED"],
      default: "CONFIRMED",
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

//export const TourBookingModel = model<ITourBookings>('TourBookings',tourBookingSchema);
export const TourBookingModel = model<ITourBookings>('Bookings',tourBookingSchema);
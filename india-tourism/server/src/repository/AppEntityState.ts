import { Document } from 'mongoose';

export interface IUser extends Document{
     name:{
       type: String,
      required: true,
      trim: true,
    },
    signedUpFlag: String,
    mobile:{
        type: String,
       required: true,
       trim: true,
    },
    emailID:{
        type: String,
       required: true,
       trim: true,
     },
    otp:{
        type: String,
       required: true,
       trim: true,
     },
     address1 : String,
     address2 : String,
     zipcode : String,
     points : Number,
     preference1 : String,
    preference2 : String,
    tourmanagerId : String
}
export interface ITourDetails extends Document{
    locationName:{
       type: String,
      required: true,
      trim: true,
    },
    categoryID:{
       type: Number,
      required: true,
      trim: true,
    },
     tourManagerId:{
         type: String,
         required: true,
         trim: true,
    },
    triplength:{
         type: String,
      required: true
      },
      startDate : {
         type: Date,
         required: true
      },
       endDate : {
          type: Date,
          required: true
      },
    package_cost:{
        type: String,
      required: true,
    },
    max_tourist:{
         type: String,
         required: true,
    },
    seats_left:{
         type: String,
         required: true,
    },
     domesticOrInternational:{
         type: String,
         required: true,
    },
    ticket_cost:{
         type: String,
         required: true,
    },
    desc: {
      type : String
    },
    itinerary:{
      type : String
    }
  }

export interface IProduct extends Document{
    productID:{
       type: Number,
      required: true
    },
    productName:{
       type: String,
      required: true,
      trim: true,
    },
    productDesc:{
       type: String,
      required: true,
      trim: true,
    },
    image:{
      type: String,
      required: true,
      trim: true,
    },
     favorite:{
       type: String,
      
    }
  }


export interface ICategory extends Document{
    categoryID:{
       type: Number,
      required: true
    },
    categoryName:{
       type: String,
      required: true,
      trim: true,
    },
    categoryDesc:{
       type: String,
      required: true,
      trim: true,
    },
     favorite:{
       type: String,
      
    },
    productID:{
       type: Number,
      required: true
    }
  }

  export interface ILocation extends Document{
    locationID:{
       type: Number,
      required: true
    },
    spotName:{
       type: String,
      required: true
     },
    locationDesc: String,
    categoryID:{
       type: Number,
      required: true
    }
     
  }

  export interface ICity extends Document{
    cityCode:{
       type: Number,
      required: true
    },
    
    cityDesc: String
    
  }
   export interface IHotels extends Document{
    hotelCode:{
       type: Number,
      required: true
    },
    hotelName:{
       type: String,
      required: true,
      trim: true,
    },
  }

   export interface IPoints extends Document{
    points:{
       type: Number,
      required: true
    },
    offer:{
       type: String,
      required: true,
      trim: true,
    },

    isLimitedOffer:{
       type: String,
      required: true,
      trim: true,
    },
    startDate: Date,
    endDate: Date
    
  }

  export interface IOfficeLocation extends Document{
    tourManagerId:{
       type: String,
      required: true
    },
    officeLocation:{
       type: String,
      required: true
    }
    
  }

  export interface ITourManager extends Document{
    tourManagerId:{
       type: String,
      required: true
    },
    tourManagerName:{
       type: String,
      required: true
    },
    contact:{
       type: String,
      required: true
    },
    backupcontact: String,
    desc : String,
    cityCode: {
       type: Number,
      required: true
    },
    websiteURL: String
  }
  export interface IReviews  extends Document{
    tourManagerId:{
       type: String,
      required: true
    },
    reviews:{
       type: String,
      required: true
    },
    username:{
       type: String,
      required: true
    },
    email: String
           
  }

    export interface ITourBookings  extends Document{
    _id: {
			primaryKey: true,
			type: Object,
			required: true
		},
		tourManagerId: {
			type: string,
			required: true
		},
    bookingId: {
      type: string,
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
		locationName: {
			type: string,
			required: true
		},
		domesticOrInternational: {
			type: string,
			required: true
		},
		package_cost: {
			type: number,
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
		}
	           
  }



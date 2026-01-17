import { ObjectId,Document } from 'mongoose';

export interface ICustomer extends Document{
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
     city: String,
     points : Number,
     preference : [],
    tourmanagerId : String
}



export interface ITourDetails extends Document{
   _id:{
    type: Number|ObjectId,
      required: true,
      trim: true,
   },
    image: {
      fileId: ObjectId;
     filename: String;
    },
    tourOperator:{
         _id: String,
         firstName: String,
         lastName: String,
    },
    tripLength:{
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
    city:{
        _id: String,
         name: String,
    },
     state:{
      _id: String,
      name: String,
    },
    category:{
      _id: String,
      name: String,
    },
   createdAt:{
         type: Date,
         required: true
      },
      updatedAt:{
         type: Date,
         required: true
      },

    days:{
        type: String,
      required: true,
    },
    night:{
        type: String,
      required: true,
    },
    cityName:{
        type: String,
      required: true,
    },
    stateName:{
        type: String,
      required: true,
    },
    tourOperatorName:{
        type: String,
      required: true,
    },
    maxTourist:{
         type: String,
         required: true,
    },
    seatsLeft:{
         type: String,
         required: true,
    },
    currency:{
        type: String,
        required: true,
    },
     tourType:{
         type: String,
         required: true,
    },
    ticketCost:{
         type: String,
         required: true,
    },
    description: {
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

  export interface ITourOperator extends Document{
    _id: {
      type: Number, // numeric ID
      unique: true,
      index: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    roleID: { type: Number, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  }


export interface ICategory extends Document{
    _id:{
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

  export interface IOptions extends Document{
    categoryID:{
       type: Number,
      required: true
    },
    optionName:{
       type: String,
      required: true,
      trim: true,
    },
    optionDesc:{
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
    },
    optionID:{
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
    _id: {
      type: Number,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true
    },
    state: {
      type: Number, // stateId
      ref: "State",
      required: true
    }
  }

  export interface IState extends Document{
    _id: {
      type: Number,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true
    }    
  }

  export interface IPreferences extends Document{
    code:{
       type: Number,
      required: true
    },
    
    desc: String
    
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
        tourId: {
        type: Number,
        ref: "Tour",
        required: true,
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
        persons: {
      		type: Number,
      		required: true,
    	},
       days: {
        type: Number,
        required: true,
      },
      nights: {
        type: Number,
        required: true,
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

   export interface IUserBookings  extends Document{
    _id: {
			primaryKey: true,
			type: Object,
			required: true
		},
		tourManagerId: {
			type: string
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
		fromLocation: {
			type: string,
			required: true
		},
    travelMode: {
      type: String,
			required: true
    },
    hotelType: {
      type: String,
			required: true
     },
     status: {
      type: String,
			required: true
        },
		destLocation: {
			type: string,
			required: true
		},
		package_cost: {
			type: number,
			},
		touristData: {
			type: [],
			required: true
		},
    
		reviews: {
			type: []
		}
   }

    export interface ITouritinerary  extends Document{
    
    locationName: {
			type: String,
			required: true
		},
    categoryID:{
       type: Number,
      required: true
    },
		tourManagerId: {
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
      itinerary: {
			type: [],
			required: true
		}

	           
  }



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
    locationID:{
       type: Number,
      required: true,
      trim: true,
    },
    categoryID:{
       type: Number,
      required: true,
      trim: true,
    },
    operatorID:{
       type: Number,
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
        type: Number,
      required: true,
    },
    max_tourist:{
         type: Number,
         required: true,
    },
     domesticOrInternational:{
         type: String,
         required: true,
    },
    ticket_cost:{
         type: Number,
         required: true,
    },
    tourManagerId:{
         type: Number,
         required: true,
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
       type: Number,
      required: true
    },
    officeLocation:{
       type: String,
      required: true
    }
    
  }

  export interface ITourManager extends Document{
    tourManagerId:{
       type: Number,
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
    officeLocationID : Number,
    Description : String,
    cityCode: {
       type: Number,
      required: true
    }
        
  }
  export interface IReviews  extends Document{
    tourManagerId:{
       type: Number,
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



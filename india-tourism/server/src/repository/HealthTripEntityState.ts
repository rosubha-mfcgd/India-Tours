import {Document,Model} from 'mongoose'

export interface HazardCodes extends Document 
{
    code:{
       type: String,
      required: true,
      
    },
    name:{
       type: String,
      required: true,
      trim: true,
    }
}

export interface TreatmentCenterCodes extends Document 
{
    code:{
       type: String,
      required: true,
      
    },
    name:{
       type: String,
      required: true,
      trim: true,
    },
    desc:{
       type: String,
      required: true,
      trim: true,
    }

}

export interface HealthTripConfirmation extends Document 
{
    id:{
         type: Number,
        required: true
    },
    pickupSupportNeededFlag:{
       type: String,
      required: true,
      
    },
    dropSupportToHome:{
       type: String,
      required: true
    },
    specialPreferences:{
       type: String,
      required: true
    },
   hotelCode:{
       type: Number,
      required: true
    },
    pickupDropServiceToTreatmentCenter:{
       type: String,
      required: true
    },
     categoryID:{
       type: Number,
      required: true
    }
}

export interface HealthTrip extends Document 
{
    id:{
         type: Number,
        required: true
    },
    healthTripId:{
       type: String,
      required: true,
      
    },
    name:{
       type: String,
      required: true,
      trim: true,
    },
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
      startDate : {
         type: Date,
         required: true
      },
       endDate : {
          type: Date,
          required: true
      },
      prescription : String,

      healthHazardCode : String,

      treatmentCentreCode : {
         type: String,
          required: true
      },
      transportMode : {
         type: String,
          required: true
      },
       confirmed : {
         type: String,
          required: true
      }
}
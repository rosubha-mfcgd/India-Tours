const { UserbookingRepository } = require('../../dist/repository/UserbookingRepository');
require("../logNginx");
const apputil = require('../utils/appUtility');
class UserBookingService{

    constructor(){
      this.errorMsg = "Message not found";
    } 

    	

  async createUserBookings(startDate,endDate,fromLocation,destLocation,hotelType,travelMode,
       touristData,status)
        {
            let bookings = [];
            let bookingId = '';
            try{
                   const userbookingRepository = new UserbookingRepository();
                   bookingId = apputil.generateBookingId();
                    let data = {"startDate":new Date(startDate), 
                                "endDate":new Date(endDate),
                                "fromLocation":fromLocation,
                                "destLocation":destLocation,
                                "bookingId":bookingId,
                                "status": status,
                                "hotelType":hotelType,
                                "travelMode":travelMode,
                                "touristData":touristData
                            };
                    bookings = await userbookingRepository.create(data);
                    console.log('User successfully booked with object id ',bookings);
                    if(bookings){
                        console.log('bookings...',bookings);
                        bookingId = bookings.bookingId;
                        
                    }
      
        }catch(err){
         console.log(err.stack);
        logNginx(err.stack);
        
      }
    return bookingId;
   }

      async getBookingsByBookingId(startDate,endDate,fromLocation,destLocation,
             bookingid)
             {
               try{
                 const bookingRepository = new BookingRepository();
     
                 console.log("startDate...",startDate);
                 console.log("endDate...",endDate);
                 console.log("bookingid...",bookingid);
                 console.log("fromLocation...",fromLocation);
                 console.log("destLocation...",destLocation);
     
                 let existingBooking = await bookingRepository.findOne({"tourManagerId": tourManagerId,
                     "fromLocation":fromLocation,
                     "destLocation":destLocation,
                      $expr: {
                          $eq: [
                       { $dateTrunc: { date: "$startDate", unit: "day" } },
                       { $dateTrunc: { date: new Date(startDate), unit: "day" } }, 
                    
                   ],
                         $eq: [
                       { $dateTrunc: { date: "$endDate", unit: "day" } },
                       { $dateTrunc: { date: new Date(endDate), unit: "day" } }, 
                    
                   ]},
                   "bookingId":bookingid
                 });
                 if(!existingBooking)
                 {
                     console.log('Booking is not found for booking id:-',bookingid);
                    return null;
                 }else{
                  console.log('User booking successfully with object id ',existingBooking._id);
                   if(existingBooking){
                     console.log('bookings...',existingBooking);
                     return existingBooking;
                 }
             }
         }
         catch(err){
              console.log(err.stack);
             logNginx(err.stack);
             
           }
       return null;
        }

}
module.exports = UserBookingService

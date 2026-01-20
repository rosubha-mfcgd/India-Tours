const { BaseRepository } = require('../../dist/repository/BaseRepository');
const { BookingRepository } = require('../../dist/repository/BookingRepository');
const { TourRepository } = require('../../dist/repository/TourRepository');

require("../logNginx");
const apputil = require('../utils/appUtility');
class TourBookingService{
   

constructor(){
      this.errorMsg = "Message not found";
    } 

      async createBookings(tourManagerId,tourid,locationName,startDate,endDate,domesticOrInternational,
        package_cost,primarybookings,dependantbookings)
        {
            let bookings = [];
            let bookingId = '';
              const session = BaseRepository.createSession();
            try{
                    // const tourRepository =  new TourRepository();
                    // const tours = tourRepository.find({
                    //     "tourOperator": Number(tourManagerId),
                    //     "startDate": new Date(startDate).toISOString(),
                    //     "endDate": new Date(endDate).toISOString(),
                    //     })
                   console.log('details...',tourManagerId,tourid,locationName,startDate,endDate,
                        domesticOrInternational,
                package_cost,primarybookings,dependantbookings);

                let personCount = primarybookings.length+dependantbookings.length;
       
                const bookingRepository = new BookingRepository();
                bookingId = apputil.generateBookingId();
                    let data = {"tourOperatorId": Number(tourManagerId),
                                "tourId":tourid,
                                "locationName":locationName,                                
                                "startDate":new Date(startDate), 
                                "endDate":new Date(endDate),
                                "domesticOrInternational":domesticOrInternational,
                                "bookingId":bookingId,
                                "package_cost":package_cost,
                                "amountPaid": package_cost,
                                "persons": personCount,
                                "primarybookings":primarybookings,
                                "dependantbookings":dependantbookings
                            };
                    session.startTransaction();
                    bookings = await bookingRepository.create(data);
                    console.log('User successfully booked with object id ',bookings);
                    if(bookings){
                        console.log('bookings...',bookings);
                        bookingId = bookings.bookingId;
                        
                    }
                     // 4. Commit the transaction if all operations succeed
                    await session.commitTransaction();
      
        }catch(err){
            // 5. Abort the transaction if any error occurs
        await session.abortTransaction();
         console.log(err.stack);
        logNginx(err.stack);
        
      }finally{
        // 6. End the session
             session.endSession();
            console.log('Session ended.');
      }
    return bookingId;
   }



     async createBookingsByMobile(tourManagerId,locationName,startDate,endDate,domesticOrInternational,
        package_cost,bookingData)
        {
            let bookings = [];
            let bookingId = '';
            try{
                    const bookingRepository = new BookingRepository();
                   bookingId = apputil.generateBookingId();
                    let data = {"tourManagerId": tourManagerId,
                                "locationName":locationName,
                                "startDate":new Date(startDate), 
                                "endDate":new Date(endDate),
                                "domesticOrInternational":domesticOrInternational,
                                "bookingId":bookingId,
                                "package_cost":package_cost,
                                "bookings":bookingData
                            };
                    bookings = await bookingRepository.create(data);
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

     async getBookingsByBookingId(tourManagerId,locationName,startDate,endDate,domesticOrInternational,
        bookingid)
        {
          try{
            const bookingRepository = new BookingRepository();

            console.log("startDate...",startDate);
            console.log("endDate...",endDate);
            console.log("bookingid...",bookingid);
            console.log("domesticOrInternational...",domesticOrInternational);
            console.log("tourManagerId...",tourManagerId);

            let existingBooking = await bookingRepository.findOne({"tourManagerId": tourManagerId,
                "locationName":locationName,
                 $expr: {
                     $eq: [
                  { $dateTrunc: { date: "$startDate", unit: "day" } },
                  { $dateTrunc: { date: new Date(startDate), unit: "day" } }, 
               
              ],
                    $eq: [
                  { $dateTrunc: { date: "$endDate", unit: "day" } },
                  { $dateTrunc: { date: new Date(endDate), unit: "day" } }, 
               
              ]},
               "domesticOrInternational":domesticOrInternational,
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

    async updateBookingsByBookingId(existingbooking,package_cost,primarybookings,dependantbookings)
        {
            let result = null;
             const bookingRepository = new BookingRepository();
            try{
                let data = {"package_cost":package_cost,
                "primarybookings":primarybookings,
                "dependantbookings":dependantbookings}
               let updateResult = await bookingRepository.update(existingbooking._id,data);
                if(updateResult)
                {
                     console.log('booking....',result);
                    result =  await bookingRepository.findOne({bookingId:existingbooking.bookingId})
                }

            }catch(err){
                console.log(err.stack);
                logNginx(err.stack); 
            }
            return result;
        }
}

module.exports = TourBookingService
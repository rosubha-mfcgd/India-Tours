const { BookingRepository } = require('../repository/BookingRepository');
require("../logNginx");
const apputil = require('../utils/appUtility');
class TourBookingService{
   

constructor(){
      this.errorMsg = "Message not found";
    } 

      async createOrUpdateBookings(tourManagerId,locationName,startDate,endDate,domesticOrInternational,
        package_cost,primarybookings,dependantbookings)
        {
            let bookings = [];
            let bookingId = '';
            try{
            const bookingRepository = new BookingRepository();
            let existingBooking = await bookingRepository.findOne({"tourManagerId": tourManagerId,
                "locationName":locationName,
                "startDate":startDate, 
                "endDate":endDate,
                "domesticOrInternational":domesticOrInternational});
            if(!existingBooking)
            {
            bookingId = apputil.generateBookingId();
            let data = {"tourManagerId": tourManagerId,
                "locationName":locationName,
                "startDate":startDate, 
                "endDate":endDate,
                "domesticOrInternational":domesticOrInternational,
                "bookingId":bookingId,
                "package_cost":package_cost,
                "primarybookings":primarybookings,
                "dependantbookings":dependantbookings
                    };
            bookings = await bookingRepository.create(data);
            console.log('User successfully booked with object id ',bookings._id);
            if(bookings && bookings.length >0){
                console.log('bookings...',bookings);
                
            }
        }else{
             console.log('User successfully booked with object id ',existingBooking._id);
              if(existingBooking && existingBooking.length >0){
                console.log('bookings...',existingBooking);
                bookingId = existingBooking.bookingId;
            }
        }
    }
    catch(err){
         console.log(err.stack);
        logNginx(err.stack);
        
      }
  return bookingId;
   }
}

module.exports = TourBookingService
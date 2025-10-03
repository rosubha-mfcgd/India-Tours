
const TourBookingService = require('../service/TourBookingService');
require("../logNginx");
const performBookings = async(req,res,retries = 3, delay = 1000) =>{

    const {tourManagerId,locationName,startDate,endDate,domesticOrInternational,
        package_cost,primarybookings,dependantbookings} = req.body;

        try{
                let tourBookingService =  new TourBookingService();
                
            let bookings = await tourBookingService.createOrUpdateBookings(tourManagerId,locationName,
                startDate,endDate,domesticOrInternational,
                package_cost,primarybookings,dependantbookings);
                res.status(200).send({"bookingid":bookings});
       }catch(err){
         if(retries>0)
        {
          await new Promise(resolve => setTimeout(resolve, delay));
          return performBookings(req,res,retries-1,delay);
        }
          logNginx(err.stack);
        res.status(400).send(
                {"errormessage":"could not find any tour operators"});
       }
       
    }
    module.exports = {performBookings}

    


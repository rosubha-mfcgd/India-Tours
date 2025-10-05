
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
                if(bookings){
                res.status(200).send({"bookingid":bookings});
                }else{
                    throw err;
                }
       }catch(err){
         if(retries>0)
        {
             console.log('retry attempted...')
          await new Promise(resolve => setTimeout(resolve, delay));
          return performBookings(req,res,retries-1,delay);
        }
          logNginx(err.stack);
        res.status(400).send(
                {"errormessage":"could not create a booking"});
       }
       
    }

    const getBookingsByBookingId = async(req,res,retries = 3, delay = 1000) =>{

        const {tourManagerId,locationName,startDate,endDate,domesticOrInternational,
        bookingId} = req.body;
            
        try{
            let tourBookingService =  new TourBookingService();

            let bookings = await tourBookingService.getBookingsByBookingId(tourManagerId,locationName,
               startDate,endDate,domesticOrInternational,bookingId);
            
                if(bookings)
                {
                    res.status(200).send(bookings);
                }else{
                    throw err;
                }

        }catch(err){
              if(retries>0)
            {
                console.log('retry attempted...')
              await new Promise(resolve => setTimeout(resolve, delay));
              return getBookingsByBookingId(req,res,retries-1,delay);
            }
          logNginx(err.stack);
        res.status(400).send(
                {"errormessage":"could not find a booking by booking id "+bookingId});
       }
    }
    

     const updateBookingsByBookingId = async(req,res,retries = 3, delay = 1000) =>{

        const {tourManagerId,locationName,startDate,endDate,domesticOrInternational,
        bookingId,package_cost,primarybookings,dependantbookings} = req.body;
            
        try{
            let tourBookingService =  new TourBookingService();
            console.log('bookingId ...'.bookingId)
            let bookingsFromDB = await tourBookingService.getBookingsByBookingId(tourManagerId,locationName,
                startDate,endDate,domesticOrInternational,bookingId);
            
                if(bookingsFromDB)
                {
                     let updatedbookings = await tourBookingService.updateBookingsByBookingId(bookingsFromDB,
                        package_cost,
                        primarybookings,dependantbookings);
                    if(updatedbookings)
                    {
                        
                        res.status(200).send(updatedbookings);
                    }else{
                        console.log('could not update bookings....')
                        throw err;
                    }
                }else{
                    console.log('could not find booking by booking id')
                    throw err;
                }

        }catch(err){
              if(retries>0)
            {
                console.log('retry attempted...')
              await new Promise(resolve => setTimeout(resolve, delay));
              return updateBookingsByBookingId(req,res,retries-1,delay);
            }
          logNginx(err.stack);
        res.status(400).send(
                {"errormessage":"could not update booking by bookingId "+bookingId});
       }
    }
    
    module.exports = {performBookings,getBookingsByBookingId,updateBookingsByBookingId}

    


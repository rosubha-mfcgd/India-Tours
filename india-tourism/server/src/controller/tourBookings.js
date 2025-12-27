
const TourBookingService = require('../service/TourBookingService');
const UserBookingService = require('../service/UserBookingService');
require("../logNginx");
const performBookings = async(req,res,retries = 3, delay = 1000) =>{

    const {tourManagerId,locationName,startDate,endDate,domesticOrInternational,
        package_cost,primarybookings,dependantbookings} = req.body;

        try{
                let tourBookingService =  new TourBookingService();
                
            let bookings = await tourBookingService.createBookings(tourManagerId,locationName,
                startDate,endDate,domesticOrInternational,
                package_cost,primarybookings,dependantbookings);
                if(bookings){
                  console.log('bookings...',bookings);
                res.status(200).send({"bookingid":bookings});
                }else{
                    throw new Error("could not create a booking on attempt #:-",retries);
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

    const performBookingsByMobile = async(req,res,retries = 3, delay = 1000) =>{

    const {tourManagerId,locationName,startDate,endDate,domesticOrInternational,
        package_cost,bookingData} = req.body;

        try{
                let tourBookingService =  new TourBookingService();
                
            let bookings = await tourBookingService.createBookingsByMobile(tourManagerId,locationName,
                startDate,endDate,domesticOrInternational,
                package_cost,bookingData);
                if(bookings){
                  console.log('bookings...',bookings);
                res.status(200).send({"bookingid":bookings});
                }else{
                    throw new Error("could not create a booking on attempt #:-",retries);
                }
       }catch(err){
         if(retries>0)
        {
             console.log('retry attempted...')
          await new Promise(resolve => setTimeout(resolve, delay));
          return performBookingsByMobile(req,res,retries-1,delay);
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
                    res.status(200).send(
                {
                  "errormessage":"could not find a booking by booking id "+bookingId});
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
                       throw new Error("could not update a booking on attempt #:-",retries);
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

    const performUserBookings = async(req,res,retries = 3, delay = 1000) =>{

    const {startDate,endDate,fromLocation,destLocation,
       touristData} = req.body;

        try{
           if(touristData && touristData.length ===0)
           {
            res.status(200).send({"errorDetails":"No toursits found"});
           }else
            {
                let userBookingService =  new UserBookingService();
                
            let bookings = await userBookingService.createUserBookings(startDate,endDate,fromLocation,destLocation,
       touristData);
                if(bookings){
                  console.log('bookings...',bookings);
                res.status(200).send({"bookingid":bookings});
                }else{
                    throw new Error("could not create a booking on attempt #:-",retries);
                }
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
    
    module.exports = {performBookings,performBookingsByMobile,getBookingsByBookingId,
      updateBookingsByBookingId,performUserBookings}

    


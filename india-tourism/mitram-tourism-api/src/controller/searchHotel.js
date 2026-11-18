require("../logNginx");
const axios = require('axios');
const querystring = require('querystring');
const apputil = require('../utils/appUtility');
const searchHotelByGeoCodeAndAvailableDates = async (req,res,retries = 3, delay = 1000) => {
    try{
        const {travelDestination,checkInDate,checkOutDate,noOfTourists} = req.body;
        let req_data = {
    "countryCode": "IND",
    "cityName": travelDestination,
    "checkin": checkInDate,
    "checkout": checkOutDate,
    "currency": "INR",
    "guestNationality": "IND",
    "occupancies": [
      { "adults": noOfTourists }
    ],
    "limit": 20,
    "maxRatesPerHotel": 1,
    "timeout": 6
  }

    // Load the exact same Master Key from your .env file
  
    let hotel_api_key = apputil.decrypt(process.env.HOTEL_API_KEY,"aes-256-gcm")
    console.log('hotel_api_key...',hotel_api_key);
         await axios.post(process.env.SEARCH_HOTEL_URL, querystring.stringify(req_data),
                {
                    headers:{
                    'Content-Type': 'application/*+json',
                    'accept': 'application/json',
                    'X-API-Key': hotel_api_key,
                    
        
                    }}).then(
                    response => {
                        console.log('response data....',response.data)
                        res.status(200).send(response.data);
                    }
                    );
        
    }catch(err){
          console.error('Error while fetching token:::', err.stack);
          if(retries>0)
            {
                console.log('retry attempted...')
              await new Promise(resolve => setTimeout(resolve, delay));
              return searchHotelByGeoCodeAndAvailableDates(req,res,retries-1,delay);
            }
        throw err;
    }

}
module.exports={searchHotelByGeoCodeAndAvailableDates}
require("../logNginx");
const axios = require('axios');
const querystring = require('querystring');
const apputil = require('../utils/appUtility');
const searchHotelByGeoCodeAndAvailableDates = async (req,res,retries = 3, delay = 1000) => {
    try{
        const {travelDestination,checkInDate,checkOutDate,noOfTourists} = req.body;
        let req_data = {
    "countryCode": "IN",
    "cityName": travelDestination,
    "checkin": checkInDate,
    "checkout": checkOutDate,
    "currency": "INR",
    "guestNationality": "IN",
    "occupancies": [
      { "adults": noOfTourists, "childrens":[0] }
    ]
  }

    // Load the exact same Master Key from your .env file
  
    let hotel_api_key = apputil.decrypt(process.env.HOTEL_API_KEY,"aes-256-gcm")
    console.log('hotel_api_key...',hotel_api_key);
    console.log('data...',JSON.stringify(req_data))
    
    const hotelsearchResponse = await fetch(process.env.SEARCH_HOTEL_URL,{ 
         method: 'POST',
         headers:{
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'X-API-Key': hotel_api_key,
                   },
        body: JSON.stringify(req_data)
    });
    if(hotelsearchResponse){
        const reader = hotelsearchResponse.body.getReader();
        const decoder = new TextDecoder();
        res.status(200);
        res.setHeader('Content-Type','application/json');
        while (true) {
        const { done, value } = await reader.read();
        if (done) 
            break;
        res.write(value);
       // console.log('Chunk:', decoder.decode(value, { stream: true }));
        }
    }
        
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
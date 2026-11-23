require("../logNginx");
const apputil = require('../utils/appUtility');
const HotelResultFilterService = require('../services/HotelResultFilterService');
const searchHotelByGeoCodeAndAvailableDates = async (req,res,retries = 3, delay = 1000) => {
    try{
        const {travelDestination,checkInDate,checkOutDate,noOfTourists,
            childTourists,hotelrating} = req.body;
        let req_data = {
        "countryCode": "IN",
        "cityName": travelDestination,
        "checkin": checkInDate,
        "checkout": checkOutDate,
        "currency": "INR",
        "guestNationality": "IN",
        "occupancies": [
        { "adults": noOfTourists, "childrens":[childTourists] }
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
        let hotelResultFilterService  = new HotelResultFilterService();
        let search_result = "";
        while (true) {
            const { done, value } = await reader.read();
        if (done) 
            break;
            search_result+=decoder.decode(value, { stream: true });
            //console.log('Chunk:', decoder.decode(value, { stream: true }));
        }
       // console.log('search_result...',search_result)
         let hotelResults = await hotelResultFilterService.
            prepareHotelDetails(JSON.parse(search_result));

      if(hotelResults)
      {
       // console.log('Json string....', JSON.stringify(search_result))
        res.writeHead(200, { 'Content-Type': 'application/json' }); 
        res.write(JSON.stringify(hotelResults));
      }else{
        //console.log('Json string....', JSON.stringify(search_result))
        res.writeHead(200, { 'Content-Type': 'application/json' }); 
        res.write("No results available");
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
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ message: "Invalid request body missing params",
                            "error":err.message}));
        throw err;
    }
    finally{
        if(res != null){
            res.end();
        }
    }

}
module.exports={searchHotelByGeoCodeAndAvailableDates}
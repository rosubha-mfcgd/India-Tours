require("../logNginx");
const axios = require('axios');
const querystring = require('querystring');
const fetchHotelInitToken = async (req,res,retries = 3, delay = 1000) => {

try{
       
        console.log('hotel INIT url ....',process.env.ZENTRUMHUB_HOTEL_INIT_URL);
        console.log('API Key ....',process.env.ZENTRUMHUB_API_KEY);
        console.log('Account id ....',process.env.ZENTRUMHUB_ACCOUNT_ID);
        const data = {"channelId": "zentrum-demo-channel",
    "currency": "USD",
    "culture": "en-US",
    "checkIn": "2026-12-10",
    "checkOut": "2026-12-12",
    "occupancies": [
      {
        "numOfAdults": 2,
        "childAges": []
      }
    ],
    "circularRegion": {
      "centerLat": 40.7580,
      "centerLong": -73.9855,
      "radiusInKm": 5
    },
    "nationality": "US",
    "countryOfResidence": "US",
    "destinationCountryCode": "US",
    "travelPurpose": "Leisure"};

        await axios.post(process.env.ZENTRUMHUB_HOTEL_INIT_URL, data,
        {
            headers:{
            'Content-Type': 'application/*+json',
            'accept': 'application/json',
            'apiKey': process.env.ZENTRUMHUB_API_KEY,
            'accountId':process.env.ZENTRUMHUB_ACCOUNT_ID

            }}).then(
            response => {
                console.log('response data....',response.data)
                res.status(200).send(response.data);
            }
            );

    }catch(err){
    console.error('Error while fetching token:::', err.stack);
    throw err;
}
}
const getKeycloakAuthToken = async(req,res,retries = 3, delay = 1000) => {

  // let { email,mobile,access_token } = req.body;

 //    let isLoggedin = null;
  let data = {
      client_id: process.env.AUTH_CLIENT_ID,
      client_secret: process.env.AUTH_CLIENT_SECRET,
      grant_type: process.env.GRANT_TYPE
  }
  
try{
  await axios.post(process.env.AUTH_SERVER_URI,querystring.stringify(data),
  {
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      }}).then(
      response => {
          console.log('response data....',response.data)
          res.status(200).send(response.data);
      }
    );

    }
    catch(err)
      {
         if(retries>0)
        {
          await new Promise(resolve => setTimeout(resolve, delay));
          return getKeycloakAuthToken(req,res,retries-1,delay);
        }
        logNginx(err.stack)
      }
     //  return isLoggedin;
}

module.exports={fetchHotelInitToken,getKeycloakAuthToken}
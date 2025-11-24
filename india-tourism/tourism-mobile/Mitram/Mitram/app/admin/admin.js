import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';


export const signupUser = async(data) =>{

    let res_data = "signup failed";
   try{
    let access_token = await getApiAccessToken();
    if(access_token){
        console.log('access_token found...',access_token.data)
        const headers = {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization":"Bearer "+access_token.data.access_token
            };
    
    const response = await axios.post(
            process.env.EXPO_PUBLIC_SERVER_URI + "signup",
            data,
        {headers}
    );
      if(response){
       res_data = response.data;; 
    } 
    }
    

}catch(err){
     console.error('Error while signup:::', err);
     throw err;
}
 return res_data;
}


export const loginUser = async(data) =>{
    let res_data = "login failed";
   try{
    
     let access_token = await getApiAccessToken();
     if(access_token){
        console.log('access_token found...',access_token.data)
    const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+access_token.data.access_token
            };
   
  const response = await axios.post(
        process.env.EXPO_PUBLIC_SERVER_URI + "loginUser",
        data,
       {headers}
    );
     if(response){
        res_data = response.data;
    }
    }
   
}catch(err){
     console.error('Error while Login:::', err);
     throw err;
}
return res_data;
}
export const validateOTPForLogin = async(data) =>{
    let res_data = "otp validation failed";
   try{
   
   let access_token = await getApiAccessToken();
     if(access_token){
        console.log('access_token found...',access_token.data.access_token)
         let headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+access_token.data.access_token
            };
        let response = await axios.post(
        process.env.EXPO_PUBLIC_SERVER_URI + "validateOTP",
        data,
       {headers});
    if(response){
       res_data = response.data;; 
    }
}
    
}catch(err){
     console.error('Error while otp validation:::', err.stack);
     throw err;
}
return res_data;
}

export const getPoints = async(data) =>{
    let res_data = "failed to fetch points";
     try{
         let access_token = await getApiAccessToken();
     if(access_token){
        console.log('access_token found...',access_token.data)
    const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+access_token.data.access_token
            };
            const response = await axios.post(
        process.env.EXPO_PUBLIC_SERVER_URI + "getPoints",
        data,
       {headers});
    if(response)
     {
        res_data = response.data;

     }
     }
     
}catch(err){
     console.error('Error while fetching user points:::', err.stack);
    throw err;
}
return res_data;
}

export const getCategories = async(productID) =>{
    let res_data = "failed to fetch categories";
     try{
        let access_token = await getApiAccessToken();
        if(access_token){
            console.log('access_token found...',access_token.data)
       // console.log('data...',access_token);
        
        const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+access_token.data.access_token
            };
            const response = await axios.get(
        process.env.EXPO_PUBLIC_SERVER_URI + "getCategories?productID="+productID,
        {headers});
        if(response)
     {
        res_data = response.data;
     }
     }
     
}catch(err){
     console.error('Error while fetching categories:::', err.stack);
     throw err;
}
return res_data;
}


export const getOptions = async(productID,categoryID) =>{
    let res_data = "failed to fetch options";
     try{
        let access_token = await getApiAccessToken();
        if(access_token){
            console.log('access_token found...',access_token.data)
        const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+access_token.data.access_token
            };
            const response = await axios.get(
        process.env.EXPO_PUBLIC_SERVER_URI + "searchMyOptions?productID="+
                productID+"&categoryID="+categoryID,
        {headers});
        if(response)
     {
        res_data = response.data;
     }
     }
     
}catch(err){
     console.error('Error while fetching categories:::', err.stack);
     throw err;
}
return res_data;
}


export const getProducts = async() =>{
    let res_data = "failed to fetch products";
     try{
        let access_token = await getApiAccessToken();
        if(access_token){
            console.log('access_token found...',access_token.data)
       // console.log('data...',access_token);
        
        const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+access_token.data.access_token
            };
            const response = await axios.get(
        process.env.EXPO_PUBLIC_SERVER_URI + "getProducts",
        {headers});
        if(response)
     {
        res_data = response.data;
     }
     }
     
}catch(err){
     console.error('Error while fetching products:::', err.stack);
     throw err;
}
return res_data;
}


export const getCities = async() =>{
    let res_data = "failed to fetch cities";
     try{
        let access_token = await getApiAccessToken();
        if(access_token){
            console.log('access_token found...',access_token.data)
       // console.log('data...',access_token);
        
        const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+access_token.data.access_token
            };
            const response = await axios.get(
        process.env.EXPO_PUBLIC_SERVER_URI + "getCities",
        {headers});
        if(response)
     {
        res_data = response.data;
     }
     }
     
}catch(err){
     console.error('Error while fetching cities:::', err.stack);
     throw err;
}
return res_data;
}


export const getTripList = async(categoryId) =>{
  let res_data = "failed to fetch planned tours by categroy id";
     try{
        let access_token = await getApiAccessToken();
        if(access_token){
            console.log('access_token found...',access_token.data)
       // console.log('data...',access_token);
        
        const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+access_token.data.access_token
            };
            const response = await axios.get(
        process.env.EXPO_PUBLIC_SERVER_URI + "getToursByCategoryId?categoryId="+categoryId,
        {headers});
        if(response)
     {
        res_data = response.data;
     }
     }
     
}catch(err){
     console.error('Error while fetching categories:::', err.stack);
     throw err;
}
return res_data;
}

export const getTourManagers = async() =>{
  let res_data = "failed to fetch tour Managers";
     try{

        let access_token = await getApiAccessToken();
        if(access_token){
            console.log('access_token found...',access_token.data)
       // console.log('data...',access_token);
        
        const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+access_token.data.access_token
            };
            const response = await axios.get(
        process.env.EXPO_PUBLIC_SERVER_URI + "getTourOperators",
        {headers});
        if(response)
     {
        res_data = response.data;
     }
     }
     
}catch(err){
     console.error('Error while fetching tour managers:::', err.stack);
     throw err;
}
return res_data;
}

export const updateAsFavorite = async(data) =>{
  let res_data = "failed to update the cateogry as favorite";
     try{
        let access_token = await getApiAccessToken();
        if(access_token){
            console.log('access_token found...',access_token.data)
       // console.log('data...',access_token);
        
        const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+access_token.data.access_token
            };
            const response = await axios.post(
        process.env.EXPO_PUBLIC_SERVER_URI + "updateFavoriteCategory",
            data, {headers});
        if(response)
     {
        res_data = response.data;
     }
     }
     
}catch(err){
     console.error('Could not update as favorite category:::', err.stack);
    // throw err;
}
return res_data;
}

export const performTripBooking = async(data) =>{
  let res_data = "failed to fetch bookings";
     try{
        let access_token = await getApiAccessToken();
        if(access_token){
            console.log('access_token found...',access_token.data)
        console.log('data...',data);
        
        const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+access_token.data.access_token
            };
            let response = await axios.post(
        process.env.EXPO_PUBLIC_SERVER_URI + "performBookings",
            data, {headers});
        if(response)
     {
        console.log('response....',response);
        res_data = response.data;
     }
     }
     
}catch(err){
     console.error('Could not update trip bookings:::', err.stack);
    // throw err;
}
return res_data;
}

export const performTripBookingByMobile = async(data) =>{
  let res_data = "failed to fetch bookings";
     try{
        let access_token = await getApiAccessToken();
        if(access_token){
            console.log('access_token found...',access_token.data)
        console.log('data...',data);
        
        const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+access_token.data.access_token
            };
            let response = await axios.post(
        process.env.EXPO_PUBLIC_SERVER_URI + "performBookingsByMobile",
            data, {headers});
        if(response)
     {
        console.log('response....',response);
        res_data = response.data;
     }
     }
     
}catch(err){
     console.error('Could not update trip bookings:::', err.stack);
}
return res_data;
}


export const getBookingsByBookingId = async(data) =>{
  let res_data = "failed to fetch bookings by booking id";
     try{
        let access_token = await getApiAccessToken();
        if(access_token){
            console.log('access_token found...',access_token.data)
        console.log('data...',data);
        
        const headers = {
                 "Content-type": "application/json; charset=UTF-8",
                 "Authorization":"Bearer "+access_token.data.access_token
            };
        
        const response = await axios.post(
                        process.env.EXPO_PUBLIC_SERVER_URI + "getBookingsByBookingId",
                        data, {headers});
        
         if(response)
         {
            res_data = response.data;
         }
     }
     
}catch(err){
     console.error('Could not find bookings:::');
    // throw err;
}
return res_data;
}

export const updateBookingsByBookingId = async(data) =>{
  let res_data = "failed to update bookings by booking id";
     try{
        let access_token = await getApiAccessToken();
        if(access_token){
            console.log('access_token found...',access_token.data)
        console.log('data...',data);
        
        const headers = {
                 "Content-type": "application/json; charset=UTF-8",
                 "Authorization":"Bearer "+access_token.data.access_token
            };
        
        const response = await axios.post(
                        process.env.EXPO_PUBLIC_SERVER_URI + "updateBookingsByBookingId",
                        data, {headers});
        
         if(response)
         {
            res_data = response.data;
         }
     }
     
}catch(err){
     console.error('Could not find bookings:::', err.stack);
    // throw err;
}
return res_data;
}


 
export const getApiAccessToken= async() =>{
  try{
    const response = await axios.post(
        process.env.EXPO_PUBLIC_SERVER_URI + "token"
    );
    if(response){
        console.log('access_token....',response.data);
        return response;
    }else{
        return "token not found";
    }
}
catch(err){
    console.error('Error while fetching token:::', err.stack);
    throw err;
}
}

export const sendConfirmationBookingEmail = async(data) =>{
let res_data = "failed to send email communication";
     try{
        let access_token = await getApiAccessToken();
        if(access_token){
            console.log('access_token found...',access_token.data)
        console.log('data...',data);
        
        const headers = {
                 "Content-type": "application/json; charset=UTF-8",
                 "Authorization":"Bearer "+access_token.data.access_token
            };
        
        const response = await axios.post(
                        process.env.EXPO_PUBLIC_SERVER_URI + "sendConfirmation",
                        data, {headers});
        
         if(response)
         {
            res_data = response.data;
         }
     }
     
}catch(err){
     console.error('Could not send communication:::', err.stack);
    // throw err;
}
return res_data;

}

export const getIteneraries = async(data) =>{
let res_data = "The itinerary of this trip will be available shortly";
try{
         let access_token = await getApiAccessToken();
         if(access_token){
             console.log('access_token found...',access_token.data)
             console.log('data...',data);
        
            const headers = {
                 "Content-type": "application/json; charset=UTF-8",
                 "Authorization":"Bearer "+access_token.data.access_token
            };
            const response = await axios.post(
                        process.env.EXPO_PUBLIC_SERVER_URI + "tourItenerariesForTrip",
                        data, {headers});
             if(response)
             {
                res_data = response.data;
              }
         }


   }catch(err)
   {
     console.error('Error while fetching iteneraries:::', err.stack);
   }
   return res_data;
}

export const getUpcomingEvents = async(data) =>{

  let res_data = "The upcoming events cannot be found";
try{
         let access_token = await getApiAccessToken();
         if(access_token){
             console.log('access_token found...',access_token.data)
             console.log('data...',data);
        
            const headers = {
                 "Content-type": "application/json; charset=UTF-8",
                 "Authorization":"Bearer "+access_token.data.access_token
            };
            const response = await axios.post(
                        process.env.EXPO_PUBLIC_SERVER_URI + "findUpcomingEvents",
                        data, {headers});
             if(response)
             {
                res_data = response.data;
              }
         }


   }catch(err)
   {
     console.error('Error while fetching events:::', err.stack);
   }
   return res_data;



}


export const persistDataInCache = async(key,value) =>{
    try{
        const jsonStrValue = JSON.stringify(value);
        await AsyncStorage.setItem(key,jsonStrValue);
        console.log('response successfully cached ');
    }catch(err){
        console.error('response could not be cached ',err.stack);
    }
}

export const getDataFromCache = async(key) =>{
    let result = null;
    try{
        const jsonStrValue = await AsyncStorage.getItem(key);
        if(jsonStrValue !== null)
        {
            result = JSON.parse(jsonStrValue)
            console.log('response successfully retrieved from cache ',result);
        }
        
    }catch(err){
        console.error('response could not be retrieved ',err.stack);
    }
    return result;
}

export const removeDataFromCache = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`${key} removed successfully.`);
  } catch (error) {
    console.error('Error removing data:', error);
  }
};
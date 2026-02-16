import axios from "axios"


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
            process.env.REACT_APP_SERVER_URI + "signup",
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
        process.env.REACT_APP_SERVER_URI + "loginUser",
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
        process.env.REACT_APP_SERVER_URI + "validateOTP",
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
        process.env.REACT_APP_SERVER_URI + "getPoints",
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
        process.env.REACT_APP_SERVER_URI + "getCategories?productID="+productID,
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
        process.env.REACT_APP_SERVER_URI + "searchMyOptions?productID="+
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
        process.env.REACT_APP_SERVER_URI + "getProducts",
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
        process.env.REACT_APP_SERVER_URI + "getCities",
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
        process.env.REACT_APP_SERVER_URI + "getToursByCategoryId?categoryId="+categoryId,
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
        process.env.REACT_APP_SERVER_URI + "getTourOperators",
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
        process.env.REACT_APP_SERVER_URI + "updateFavoriteCategory",
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
  let res_data = "failed to perform bookings";
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
        process.env.REACT_APP_SERVER_URI + "performBookings",
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

export const performCustomUserTripBooking = async(data) =>{
  let res_data = "failed to create user bookings";
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
        process.env.REACT_APP_SERVER_URI + "performUserBookings",
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


//Get completed bookings by booking id
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
                        process.env.REACT_APP_SERVER_URI + "getBookingsByBookingId",
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
                        process.env.REACT_APP_SERVER_URI + "updateBookingsByBookingId",
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
        process.env.REACT_APP_SERVER_URI + "token"
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

//Produces auth token to validate the request
export const getAuthAccessToken = async() =>{

     let res_data = "";
    // let tokenUri = process.env.EXPO_AUTH_SERVER_URI;
   try{
      let access_token = await getApiAccessToken();

      if(access_token){
         console.log('access_token found for user Auth...',access_token.data)
        const response = await axios.post(process.env.REACT_APP_SERVER_URI+'authToken',
            {},
           {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization":"Bearer "+access_token.data.access_token
            }}           
          );
      if(response)
    {
        console.log('response from keycloak...',response)
        const tokens = await response.data;
            if(tokens)
            {
            console.log('Access Tokens:', tokens);
            res_data = tokens;
            }
        } 
    }
}catch(err){
    console.log(err.stack)
     console.error('Error while token from session:::', err);
     throw err;
}
return res_data;
}

export const exchangeAuthToken = async(code,codeVerifier, tokenUri) =>{
     let res_data = "";
   try{
       // console.log('access_token found...',access_token.data)
            
        const response = await axios.post(tokenUri,
           {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        body: new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: 'mitram-expo-client',
               // redirect_uri: redirectUri,
                code,
                code_verifier: codeVerifier, // This is the crucial PKCE piece
      }).toString(),
    });
      if(response){
        const tokens = await response.json();
        if(tokens)
        {
            console.log('Access Tokens:', tokens);
            res_data = tokens;
        }
    } 
    
}catch(err){
     console.error('Error while token from session:::', err);
     throw err;
}

    return res_data;
}

export const getImageById = async(data,bucketname) =>{
     let res_data = "failed to process image";
     let access_token = await getApiAccessToken();
        if(access_token)  {
            const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+access_token.data.access_token
            };
            let response = await axios.get(
                process.env.REACT_APP_SERVER_URI + "getImageFromDB"+"/"+data+"/"+bucketname,
                {headers});
        if(response)
     {
        console.log('response....',response.data);
        res_data = response.data.image;
     }
    }
     return res_data;
}

export const getRecommendedTours = async() =>{
     let res_data = "failed to fetch recommend tours";
     let access_token = await getApiAccessToken();
        if(access_token)  {
            const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+access_token.data.access_token
            };
            let response = await axios.get(
                process.env.REACT_APP_SERVER_URI + "getRecommendedTours",
                {headers});
        if(response)
     {
        console.log('response....',response.data);
        res_data = response.data;
     }
    }
     return res_data;
}

export const createIntent = async(data) =>{
    let res_data = "failed to fetch client secret";
    try{
        let access_token = await getApiAccessToken();

      if(access_token){
         console.log('access_token found for user Auth...',access_token.data)
         console.log('here i am calling create-payment-intent....');
        const response = await axios.post(process.env.REACT_APP_SERVER_URI+'create-payment-intent',
          data, 
       {    
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization":"Bearer "+access_token.data.access_token,
                 }}
          );     
          
      if(response)
        {
            console.log('response from payment intent...',response)
            res_data = await response.data;
           
         } 
    }
   }catch(err){
         console.log(err.stack)
         console.error('Error from payment intent:::', err);
        // throw err;
    }
    return res_data;
}

export const retrievePaymentIntent = async(data) =>{
      let res_data = "failed to fetch client secret";
    try{
        let access_token = await getApiAccessToken();

      if(access_token){
         console.log('access_token found for user Auth...',access_token.data)
         console.log('here i am calling create-payment-intent....');
        const response = await axios.post(process.env.REACT_APP_SERVER_URI+'retrievePaymentIntent',
          data, 
       {    
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization":"Bearer "+access_token.data.access_token,
                 }}
          );     
          
      if(response)
        {
            console.log('response from retrieve payment confirmation...',response)
            res_data = await response.data;
           
         } 
    }
   }catch(err){
         console.log(err.stack)
         console.error('Error from payment intent:::', err);
        // throw err;
    }
    return res_data;
}



export const confirmStripePayment = async(data)=>{
       let res_data = "failed to fetch client secret";
    try{
        let access_token = await getApiAccessToken();

      if(access_token){
         console.log('access_token found for user Auth...',access_token.data)
         console.log('here i am calling confirm-payment-intent....');
        const response = await axios.post(process.env.REACT_APP_SERVER_URI+'confirm-packagetour-cardpayment-success',
          data, 
       {    
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization":"Bearer "+access_token.data.access_token,
                 }}
          );     
          
      if(response)
        {
            console.log('response from payment confirmation...',response)
            res_data = await response.data;
           
         } 
    }
   }catch(err){
         console.log(err.stack)
         console.error('Error from payment intent:::', err);
        // throw err;
    }
    return res_data;
}





export const keycloakConfig = {
  issuer: 'http://localhost:8080/realms/mitram-dev', // e.g., https://auth.example.com/realms/my-expo-realm
  clientId: 'confidential',
  redirectUrl: 'exp://10.0.0.185:8081/login/profile', // Must match the Valid Redirect URI in Keycloak
  scopes: ['openid', 'profile', 'email', 'offline_access'], // Add 'offline_access' for refresh tokens
  serviceConfiguration: {
    authorizationEndpoint: 'http://localhost:8080/realms/mitram-dev/protocol/openid-connect/auth',
    tokenEndpoint: 'http://localhost:8080/realms/mitram-dev/protocol/openid-connect/token',
  },
};




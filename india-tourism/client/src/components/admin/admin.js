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

export const getCategories = async(data) =>{
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
        process.env.REACT_APP_SERVER_URI + "getCategories",
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

export const showTripList= async(data) =>{
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
        process.env.REACT_APP_SERVER_URI + "getCategories",
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


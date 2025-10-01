import axios from "axios"


export const signupUser = async(data,retries = 3, delay = 1000) =>{

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
     if(retries>0)
     {
        await new Promise(resolve => setTimeout(resolve, delay));
        return signupUser(data,retries-1,delay);
     }
    throw err;
}
 return res_data;
}


export const loginUser = async(data,retries = 3, delay = 1000) =>{
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
      if(retries>0)
     {
        await new Promise(resolve => setTimeout(resolve, delay));
        return loginUser(data,retries-1,delay);
     }
    throw err;
}
return res_data;
}
export const validateOTPForLogin = async(data,retries = 3, delay = 1000) =>{
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
      if(retries>0)
     {
        await new Promise(resolve => setTimeout(resolve, delay));
        return validateOTPForLogin(data,retries-1,delay);
     }
    throw err;
}
return res_data;
}

export const getPoints = async(data,retries = 3, delay = 1000) =>{
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
      if(retries>0)
     {
      await new Promise(resolve => setTimeout(resolve, delay));
        return getPoints(data,retries-1,delay);
     }
    throw err;
}
return res_data;
}

export const getCategories = async(productID,retries = 3, delay = 1000) =>{
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
      if(retries>0)
     {
       await new Promise(resolve => setTimeout(resolve, delay));
        return getCategories(productID,retries-1,delay);
     }
    throw err;
}
return res_data;
}


export const getProducts = async(retries = 3, delay = 1000) =>{
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
      if(retries>0)
     {
         await new Promise(resolve => setTimeout(resolve, delay));
        return getProducts(retries-1,delay);
     }
    throw err;
}
return res_data;
}


export const getCities = async(retries = 3, delay = 1000) =>{
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
      if(retries>0)
     {
      await new Promise(resolve => setTimeout(resolve, delay));
        return getCities(retries-1,delay);
     }
    throw err;
}
return res_data;
}


export const getTripList = async(categoryId,retries = 3, delay = 1000) =>{
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
      if(retries>0)
     {
      await new Promise(resolve => setTimeout(resolve, delay));
        return getCities(retries-1,delay);
     }
    throw err;
}
return res_data;
}

export const getTourManagers = async(retries = 3, delay = 1000) =>{
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
      if(retries>0)
     {
      await new Promise(resolve => setTimeout(resolve, delay));
        return getCities(retries-1,delay);
     }
    throw err;
}
return res_data;
}

export const updateAsFavorite = async(data,retries = 3, delay = 1000) =>{
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
      if(retries>0)
     {
      await new Promise(resolve => setTimeout(resolve, delay));
        return updateAsFavorite(data,retries-1,delay);
     }
    throw err;
}
return res_data;
}

 
export const getApiAccessToken= async(retries = 3, delay = 1000) =>{
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
     if(retries>0)
     {
     await new Promise(resolve => setTimeout(resolve, delay));
        return getApiAccessToken(retries-1,delay);
     }
    throw err;
}
}





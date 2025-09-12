import axios from "axios"

export const signupUser = async(data) =>{

   try{
    const headers = {
            "Content-type": "application/json; charset=UTF-8",
            };
   
  const response = await axios.post(
        process.env.REACT_APP_SERVER_URI + "signup",
        data,
       {headers}
);
return response.data;
}catch(err){
     console.error('Error while signup:::', err);
    throw err;
}

}


export const loginUser = async(data) =>{

   try{
    const headers = {
            "Content-type": "application/json; charset=UTF-8",
            };
   
  const response = await axios.post(
        process.env.REACT_APP_SERVER_URI + "loginUser",
        data,
       {headers}
);
return response.data;
}catch(err){
     console.error('Error while Login:::', err);
    throw err;
}

}
export const validateOTPForLogin = async(data) =>{

   try{
    const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+data.access_token
            };
   
  const response = await axios.post(
        process.env.REACT_APP_SERVER_URI + "validateOTP",
        data,
       {headers}
);
return response.data;
}catch(err){
     console.error('Error while otp validation:::', err.stack);
    throw err;
}

}

export const getPoints = async(data) =>{
     try{
    const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+data.access_token
            };
            const response = await axios.post(
        process.env.REACT_APP_SERVER_URI + "getPoints",
        data,
       {headers}
);
return response.data;
}catch(err){
     console.error('Error while fetching user points:::', err.stack);
    throw err;
}

}

export const getCategories = async(data) =>{
     try{
        console.log('data...',data);
    const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer "+data.access_token
            };
            const response = await axios.get(
        process.env.REACT_APP_SERVER_URI + "getCategories",
        {headers}
);
return response.data;
}catch(err){
     console.error('Error while fetching categories:::', err.stack);
    throw err;
}

}
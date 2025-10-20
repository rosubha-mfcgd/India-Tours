import axios from "axios"

const TokenService  = {
getApiAccessToken : async() =>{
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
}

export default TokenService;
const { start } = require("repl");

require("../logNginx");
require("dotenv").config();
const { env } = require('process');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const encryptionUtil = require('../utilities/encryptionUtil');
// import { initializeAgentExecutorWithOptions } from 'langchain/agents';
// import { Calculator } from 'langchain/tools/calculator';





const findWeatherDetailByState = async(req,res,retries = 3, delay = 1000) => {

    let {stateName, cityName,startDate,endDate,model} = req.body;

    try{
        
        let prompt = `Provide the weather information with chances of rain or snowfall in ${cityName} , ${stateName} from ${startDate}-${endDate}`;
        
        let geminiAIKey = process.env.GOOGLE_GEMINI_API_KEY;
       // console.log('geminiAIKey...',geminiAIKey)
        const genAI = new GoogleGenerativeAI(geminiAIKey);
        //prepares google gemini model
        let genModel =  genAI.getGenerativeModel({model:model});
        
        let result = await genModel.generateContent(prompt);

        if(result){
             const response = await result.response;
             if(response){
            const text = response.text;
            console.log('text...',text)
            res.status(200).send(text);
             }
        }

    }catch(err)
    {
        logNginx(err.stack)
         res.status(400).send({"error":"No details found from search"});
    }



}

module.exports = {findWeatherDetailByState}
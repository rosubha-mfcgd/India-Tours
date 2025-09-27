require("../logNginx");

const TourDetailService = require('../service/TourDetailService');

const getRegisteredTourManagers=async(req,res) =>{
    try{
    let tourManagers = await new TourDetailService().getTourManagers();
    if(tourManagers)
    {
        console.log('tourManagers..',tourManagers);
          res.status(200).send(
                tourManagers); 
    }
}catch(err)
{
    logNginx(err.stack);
     res.status(400).send(
                {"errormessage":"could not find any tour operators"});
}

}

const getCities = async(req,res) =>{
     try{
    let cities = await new TourDetailService().getCities();
    if(cities)
    {
        console.log('cities..',cities);
          res.status(200).send(
                cities); 
    }
}catch(err)
{
    logNginx(err.stack);
     res.status(400).send(
                {"errormessage":"could not find any cities"});
}
}

module.exports = {getRegisteredTourManagers,getCities}

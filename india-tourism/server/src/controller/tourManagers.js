const express = require('express');
const session = require('express-session');
require("../logNginx");

const TourDetailService = require('../service/TourDetailService');

const getRegisteredTourManagers=async(req,res) =>{
    try{
    let tourManagers = await new TourDetailService().getTourManagers();
    if(tourManagers)
    {
        console.log('tourManagers..',tourManagers);changeDateToWords
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

module.exports = {getRegisteredTourManagers}

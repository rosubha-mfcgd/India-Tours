const EmailService = require('../service/EmailService');
require("../logNginx");
require("dotenv").config();
 const subject = process.env.BOOKING_CONFIRMATION_EMAIL_SUBJECT;
 const additionalInfo = process.env.BOOKING_CONFIRMATION_EMAIL_SUBJECT_ADDL_TEXT1;
  const startdateinfo = process.env.BOOKING_CONFIRMATION_EMAIL_SUBJECT_ADDL_TEXT_START_DATE;
   const enddateinfo = process.env.BOOKING_CONFIRMATION_EMAIL_SUBJECT_ADDL_END_DATE;
   const welcomeMessage = process.env.BOOKING_CONFIRMATION_WELCOME_MESSAGE;
const sendConfirmation = async(req,res,retries = 5, delay = 1000) =>{

    const { email,tourmanagername, locationName, bookingid, startDate,endDate } = req.body;

    //console.log('email,tourmanagername, locationName, bookingid, startDate,endDate',
     // email,tourmanagername, locationName, bookingid, startDate,endDate);
     
    let body = subject.concat(tourmanagername).concat(". ").concat("Your bookingID is ").concat(bookingid).concat(". ").concat(additionalInfo).concat(startdateinfo).concat(" ").concat(startDate).concat(" ").concat(enddateinfo).concat(" ").concat(endDate).concat(".").concat(welcomeMessage);

    console.log('emailbody....',body);
    try{
    let subject = "Mitram Booking confirmation #"+bookingid+" for "+locationName+" tour";
     await new EmailService().send(email,subject,body);
     res.status(200).send({"status":"sent"});
    }catch(error){
         if(retries>0)
        {
          await new Promise(resolve => setTimeout(resolve, delay));
          return sendEmail(req,res,retries-1,delay);
        }
        console.log(error.stack)
        //logNginx(error.stack);
        res.status(400).send(
                {"status":"could not send email"});
    }
      
       
    }


module.exports = {sendConfirmation}
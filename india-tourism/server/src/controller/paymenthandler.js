
const TourBookingService = require('../service/TourBookingService');
const UserBookingService = require('../service/UserBookingService');

const stripe = require('stripe')(process.env.STRIPE_PAYMENT_SECRET_KEY);
//create the payment intent for stripe card payment
const createPaymentIntent = async(req,res,retries = 5, delay = 1000) =>{
         

    const {amount,currency} = req.body;
    console.log("req body...",req.body);
    const csrfToken = req.header("X-CSRF-Token");
    if(!csrfToken)
    {
      res.status(400).send("csrf Token not found");
    }
    else{
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency||'usd',
        // In 2026, automatic methods are the standard
        automatic_payment_methods: { enabled: true },
      });
      if(paymentIntent)
      {
      console.log('paymentIntent....',paymentIntent);
      res.status(200).
      json({ clientSecret: paymentIntent.client_secret,paymentIntent_id:paymentIntent.id });
    }
}
}
//Retieve payment intent 
const retrievePaymentIntent = async(req,res,retries=5, delay=1000) =>{
    const {paymentIntentId} = req.body;
   
    try{
         console.log('paymentIntentId....',paymentIntentId);
             let paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId,
                    {expand:['payment_method']}
             ); 
               
                 if(paymentIntent)
                {
                  console.log('result fom payment intent retrieve....',paymentIntent);
                
                        const amount = paymentIntent.amount; // The total amount of the PaymentIntent
                        const last4carddigits = paymentIntent.payment_method?.card?.last4; 
                        const brand = paymentIntent.payment_method?.card?.brand; 
                        console.log('amount,last4carddigits....',amount,last4carddigits)
                        res.status(200).send(
                                {"amount":amount,"last4carddigits":last4carddigits,
                                "paymentstatus":paymentIntent.status,
                                "brand":brand
                                });
                 }else
                {

                  res.status(200).send(
                        {"errormessage":"Could not find payment intent"});
                }
    }
    catch(err){
             if(retries>0)
                {
                     console.log('retry attempted...')
                  await new Promise(resolve => setTimeout(resolve, delay));
                  return retrievePaymentIntent(req,res,retries-1,delay);
                }
                  logNginx(err.stack);
                res.status(400).send(
                        {"errormessage":"could not retrieve payment intent details"});
               }
    }



//Handles the DB update operation after card payment
const confirmPackageTourCardPayment = async(req,res,retries = 5, delay = 1000) =>{
         console.log("req body in confirmPackageTourCardPayment...",req.body);
    const { bookingid,last4carddigits,paidamount,paymentmode,paymentIntentId,brand} = req.body;
    try{
      console.log('paymentIntent found from stripe dashboard....',paymentIntentId);
        // Access the last 4 digits and brand
       
        // Store this information in your database or use it for business logic
        console.log('Payment succeeded. Card brand Last 4 digits:',last4carddigits,brand);
        let tourbookingService = new TourBookingService();
        let booking = await tourbookingService.getBookingsByBookingId(null,null,null,null,null,bookingid);
        if(booking)
        {
            console.log('booking object found...',booking);
            let result = await tourbookingService.
                            updateBookingDetailsByBookingId(booking,paymentIntentId,brand,
                last4carddigits,paymentmode);

                if(result){
                    console.log('updated booking object....',result)
                }
        res.status(200).json({ received: true, last4: last4carddigits, brand: brand, bookingid:bookingid });
        }
        
    }catch(err){
          if(retries>0)
                {
                     console.log('retry attempted...')
                  await new Promise(resolve => setTimeout(resolve, delay));
                  return confirmPackageTourCardPayment(req,res,retries-1,delay);
                }
                  logNginx(err.stack);
                res.status(400).send(
                        {"errormessage":"could not create a booking"});
               }
    }

module.exports = {createPaymentIntent,retrievePaymentIntent,confirmPackageTourCardPayment}
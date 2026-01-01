// controllers/tourController.js
const mongoose = require("mongoose");
const Tour = require('../models/Tour');
const City = require('../models/City');
const State = require('../models/State');
const Booking = require("../models/Booking");
const { uploadImage } = require("../middleware/upload");
const multer = require("multer");
const storage = multer.memoryStorage();
// Multer config (memory storage → buffer available)

// Middleware to upload single file
const multerStorage = multer({ storage });
exports.uploadTourImage = multerStorage.single("image");
/**
 * Add new tour
 */

// Helper function for validation
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);



exports.addTourWithImage = async (req, res) => {
  try {
      const {
        tourOperatorId,
        tripLength,
        startDate,
        endDate,
        packageCost,
        nights,
        days,
        maxTourist,
        seatsLeft,
        tourType,
        ticketCost,
        cityId,
        stateId,
        description,
        currency,
      } = req.body; 
  console.log('req.body ',req.body);
 
console.log('req.file ', req.file);
if (Number.isNaN(tripLength)) {
    return res.status(400).json({
        error: "tripLength must be a valid number"
    });
}
if (isNaN(Date.parse(startDate))) return res.status(400).json({
    error: "startDate must be a valid date"
});
if (isNaN(Date.parse(endDate))) return res.status(400).json({
    error: "endDate must be a valid date"
});
if (Number.isNaN(packageCost)) {
    return res.status(400).json({
        error: "packageCost must be a valid number"
    });
}
if (Number.isNaN(nights)) {
    return res.status(400).json({
        error: "nights must be a valid number"
    });
}
if (Number.isNaN(days)) {
    return res.status(400).json({
        error: "days must be a valid number"
    });
}
if (Number.isNaN(maxTourist)) {
    return res.status(400).json({
        error: "maxTourist must be a valid number"
    });
}
if (Number.isNaN(seatsLeft)) {
    return res.status(400).json({
        error: "seatsLeft must be a valid number"
    });
}
if (Number.isNaN(ticketCost)) {
    return res.status(400).json({
        error: "ticketCost must be a valid number"
    });
}
if (typeof description !== "string") return res.status(400).json({
    error: "description must be a string"
});
if (!req.file) {
    return res.status(400).json({
        error: "Image is required"
    });
}
if (currency && typeof currency !== "string") return res.status(400).json({
    error: "currency must be a string"
});

 // Logical validations 
 if (seatsLeft > maxTourist) return res.status(400).json({
     error: "seatsLeft cannot exceed maxTourist"
 });
 if (new Date(endDate) <= new Date(startDate)) return res.status(400).json({
     error: "endDate must be after startDate"
 });
  // Enum validation 
 const validTourTypes = ["domestic", "international"];
 console.log('validTourTypes ', validTourTypes, ' tourType ', tourType);
 if (!validTourTypes.includes(tourType.toLowerCase())) {
     return res.status(400).json({
         error: `tourType must be one of ${validTourTypes.join(", ")}`
     });}

 // ObjectId validation 
 
  if (!isValidObjectId(tourOperatorId)) {
    return res.status(400).json({ error: "Invalid tourOperatorId ObjectId(s)" });
  }
  if (!isValidObjectId(cityId)){
   return res.status(400).json({ error: "Invalid cityId ObjectId(s)" });
  }
  if(!isValidObjectId(stateId)) {
    return res.status(400).json({ error: "Invalid stateId ObjectId(s)" });
  }

  if (!req.file) 
    return res.status(400).json({ error: "Image is required" });
  // Generate tourId first
  const tourId = new mongoose.Types.ObjectId();
  console.log("tourId", tourId);
  //Upload image first
  const uploadMiddleware = uploadImage("tourImages", tourId);
  await new Promise((resolve, reject) => {
    uploadMiddleware(req, res, (err) => {
    if (err) reject(err);
    else resolve();
    });
  });
  console.log(' fileId: ' , req.file.id,
        ' filename: ',req.file.filename);
  //Create tour first 
  const tour = await Tour.create({
      _id: tourId,
      tourOperatorId,
      tripLength: Number(tripLength),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      packageCost: Number(packageCost),
      nights: Number(nights),
      days: Number(days),
      maxTourist: Number(maxTourist),
      seatsLeft: Number(seatsLeft),
      ticketCost: Number(ticketCost),
      tourType,
      cityId,
      stateId,
      description,
      currency: currency || "INR",
      image: {
        fileId: req.file.id,
        filename: req.file.filename
      }
    });


    return res.status(201).json({
      message: "Tour created successfully",
      data: tour,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};


//JSON based obselete - NOT USED
/*exports.addTour = async (req, res) => {
  try {
    const {
      tourOperatorId,
      tripLength,
      startDate,
      endDate,
      packageCost,
      nights,
      mornings,
      maxTourist,
      seatsLeft,
      tourType,
      ticketCost,
      cityId,
      stateId,
      description,
      image,
      itinerary,
      currency
    } = req.body;

    // 1️⃣ Required fields validation
    const requiredFields = [
      "tourOperatorId", "tripLength", "startDate", "endDate",
      "packageCost", "nights", "mornings", "maxTourist",
      "seatsLeft", "tourType", "ticketCost", "cityId", "stateId", "description"
    ];

    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === "") {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // 2️⃣ Type validation
    if (typeof tripLength !== "number") return res.status(400).json({ error: "tripLength must be a number" });
    if (isNaN(Date.parse(startDate))) return res.status(400).json({ error: "startDate must be a valid date" });
    if (isNaN(Date.parse(endDate))) return res.status(400).json({ error: "endDate must be a valid date" });
    if (packageCost !== undefined) {
     packageCost = parseFloat(updates.packageCost);

  if (isNaN(packageCost)) {
    return res.status(400).json({ error: "packageCost must be a valid number" });
  }
}
if (typeof nights !== "number") return res.status(400).json({ error: "nights must be a number" });
    if (typeof mornings !== "number") return res.status(400).json({ error: "mornings must be a number" });
    if (typeof maxTourist !== "number") return res.status(400).json({ error: "maxTourist must be a number" });
    if (typeof seatsLeft !== "number") return res.status(400).json({ error: "seatsLeft must be a number" });
    if (typeof ticketCost !== "number") return res.status(400).json({ error: "ticketCost must be a number" });
    if (typeof description !== "string") return res.status(400).json({ error: "description must be a string" });
    if (image && typeof image !== "string") return res.status(400).json({ error: "image must be a string" });
    if (itinerary && typeof itinerary !== "string") return res.status(400).json({ error: "itinerary must be a string" });
    if (currency && typeof currency !== "string") return res.status(400).json({ error: "currency must be a string" });

    // 3️⃣ Logical validations
    if (seatsLeft > maxTourist) return res.status(400).json({ error: "seatsLeft cannot exceed maxTourist" });
    if (new Date(endDate) <= new Date(startDate)) return res.status(400).json({ error: "endDate must be after startDate" });

    // 4️⃣ Enum validation
    const validTourTypes = ["domestic", "international"];
    console.log('validTourTypes ', validTourTypes, ' tourType ' , tourType);
    if (!validTourTypes.includes(tourType.toLowerCase())) {
      return res.status(400).json({ error: `tourType must be one of ${validTourTypes.join(", ")}` });
    }

    // 5️⃣ ObjectId validation
    if (!isValidObjectId(cityId)) return res.status(400).json({ error: "cityId must be a valid ObjectId" });
    if (!isValidObjectId(stateId)) return res.status(400).json({ error: "stateId must be a valid ObjectId" });
     if (!isValidObjectId(tourOperatorId)) return res.status(400).json({ error: "tourOperatorId must be a valid ObjectId" });
   
    // ✅ All validations passed, create tour
    const tour = await Tour.create(req.body);
    return res.status(201).json({ message: "Tour created successfully", data: tour });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
*/

/**
 * Get all tours
 */
exports.getAllTours = async (req, res) => {
    try {
       const { stateId, cityId } = req.query;
       let tours = "";
       console.log('req.query stateId ', stateId , ' cityId ',  cityId);
       if (!(stateId === undefined) || !(cityId === undefined)) {
          tours = await getToursByCityAndState(stateId,cityId,res);
          if (!tours.length) {
           return res.status(404).json({ message: "No tours found for the given city and state" });
          }
          
       }else {
         tours = await Tour.find()
            .populate({ path: 'cityId', select: 'name' })          // populates city name
            .populate({ path: 'stateId', select: 'name' })         // populates state name
            .populate({ path: 'tourOperatorId', select: 'firstName lastName' }); // populates tour operator name
      }
      
          // Optional: rename tourOperatorId to touroperatorName
         const toursWithNames = tours.map(tour => ({
        ...tour.toObject(),
        cityName: tour.cityId?.name || null,
        stateName: tour.stateId?.name || null,
                tourOperatorName: tour.tourOperatorId 
            ? `${tour.tourOperatorId.firstName} ${tour.tourOperatorId.lastName}` 
            : null
    }));

    res.json(toursWithNames);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * Get tour by ID
 */
exports.getTourById = async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await Tour.findById(id)
            .populate('city', 'name')
            .populate('state', 'name')
            .populate('tourOperatorId', 'name');
        if (!tour) return res.status(404).json({ error: 'Tour not found' });
        res.json(tour);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * Update specific tour fields
 */
exports.updateTour = async (req, res) => {
  try {
    const tourId = req.params.id;
    console.log("Updating tourId:", tourId);
    if (!mongoose.Types.ObjectId.isValid(tourId)) return res.status(400).json({ error: "Invalid tour ID" });

    const allowedFields = [
      "description", "stateId", "cityId", "packageCost", "currency", "tourType",
      "startDate", "endDate", "days", "nights", "tripLength",
      "maxTourist", "seatsLeft", "ticketCost"
    ];

    const updates = {};
    allowedFields.forEach(f => {
      if (req.body[f] !== undefined) {
        updates[f] = ["packageCost","days","nights","tripLength","maxTourist","seatsLeft","ticketCost"].includes(f) ? Number(req.body[f]) : req.body[f];
      }
    });

    if (req.file) {
      updates.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        originalName: req.file.originalname,
      };
    }
    
   
    // Validations
    if (updates.startDate && updates.endDate && new Date(updates.endDate) <= new Date(updates.startDate))
      return res.status(400).json({ error: "endDate must be after startDate" });

// Validate dates
if (updates.startDate && updates.endDate && new Date(updates.endDate) <= new Date(updates.startDate)) {
  return res.status(400).json({ error: "endDate must be after startDate" });
}
 // Fetch existing tour
let tour = await Tour.findById(tourId);
if (!tour) return res.status(404).json({ error: "Tour not found" });

    // Prevent updating seatsLeft directly
    if (req.body.seatsLeft !== undefined && Number(req.body.seatsLeft) !== tour.seatsLeft) {
      return res.status(400).json({ 
        error: `seatsLeft cannot be updated manually. Current seatsLeft is ${tour.seatsLeft}` 
      });
    }

    // Validate maxTourist vs existing seatsLeft
    if (updates.maxTourist !== undefined && updates.maxTourist < tour.maxTourist - tour.seatsLeft) {
      return res.status(400).json({ 
        error: "maxTourist cannot be less than the number of already booked seats" 
      });
    }

// Validate maxTourist vs existing booked seats
if (updates.maxTourist !== undefined) {
  const bookedSeats = tour.maxTourist - tour.seatsLeft;
  if (updates.maxTourist < bookedSeats) {
    return res.status(400).json({ 
      error: "maxTourist cannot be less than the number of already booked seats" 
    });
  }

  // Adjust seatsLeft automatically based on new maxTourist
  updates.seatsLeft = updates.maxTourist - bookedSeats;
}

// Update tour
tour = await Tour.findByIdAndUpdate(tourId, updates, { new: true, runValidators: true });

res.json({ message: "Tour updated successfully", data: tour });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
/**
 * Delete tour
 */
exports.deleteTour = async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await Tour.findByIdAndDelete(id);
        if (!tour) return res.status(404).json({ error: 'Tour not found' });
        res.json({ message: 'Tour deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Get Tours by City & State
const getToursByCityAndState = async (stateId, cityId,res) => {
  try {     
  console.log('getToursByCityAndState stateId ', stateId , ' cityId ',  cityId);    
  let tours = "";
    if((!stateId == "") && (!cityId == "")){
    // Query DB
     tours = await Tour.find({
      stateId,
      cityId
    })
      .populate("stateId", "name")
      .populate("cityId", "name")
     .populate({ path: 'tourOperatorId', select: 'firstName lastName' }); // populates tour operator name
  
  }else{
     if(!stateId == "" && cityId == "")
       // Query DB
      tours = await Tour.find({
              stateId})
            .populate("stateId", "name")
            .populate("cityId", "name")
            .populate({ path: 'tourOperatorId', select: 'firstName lastName' }); // populates tour operator name
        
      if(!cityId == "") 
        tours = await Tour.find({
              cityId})
            .populate("stateId", "name")
            .populate("cityId", "name")
            .populate({ path: 'tourOperatorId', select: 'firstName lastName' }); // populates tour operator name
   
        }
    console.log('getToursByCityAndState tours ', tours  );
    return tours;   
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/**
 * Book a tour (payment + seat update + booking save)
 * POST /tours/book/:id
 */
exports.bookTour = async (req, res) => {
  try {
    const tourId = req.params.id;

    const {
      persons,
      fromDate,
      toDate,
      payment,
    } = req.body;

    // ---------------- Validations
    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res.status(400).json({ error: "Invalid tour ID" });
    }

    if (!persons || Number(persons) <= 0) {
      return res.status(400).json({ error: "Invalid number of persons" });
    }

    if (!fromDate || !toDate) {
      return res.status(400).json({ error: "From and To dates are required" });
    }

    if (
      !payment ||
      payment.method !== "card" ||
      !payment.cardNumber ||
      !payment.cardName ||
      !payment.expiry ||
      !payment.cvv
    ) {
      return res.status(400).json({
        error: "Invalid or missing payment details",
      });
    }

    // ---------------- Fetch tour
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    // ---------------- Seat availability
    if (tour.seatsLeft < persons) {
      return res.status(400).json({
        error: `Only ${tour.seatsLeft} seats left`,
      });
    }

    // ---------------- Calculate days & nights
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffMs = end - start;

    if (diffMs <= 0) {
      return res.status(400).json({ error: "Invalid date range" });
    }

    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const nights = days - 1;

    // ---------------- Calculate amount
    const totalAmount = persons * tour.packageCost;

    // ---------------- Fake payment gateway
    fakePaymentGateway(
      {
        amount: totalAmount,
        currency: tour.currency || "INR",
        cardLast4: payment.cardNumber.slice(-4),
      },
      async (err, paymentResponse) => {
        if (err || paymentResponse.status !== "success") {
          return res.status(402).json({ error: "Payment failed" });
        }

        // ---------------- Update seats
        tour.seatsLeft -= persons;
        await tour.save();

        // ---------------- Create booking
        const booking = await Booking.create({
          tourId: tour._id,
          persons,
          fromDate: start,
          toDate: end,
          days,
          nights,
          amountPaid: totalAmount,
          currency: tour.currency,
          payment: {
            paymentId: paymentResponse.paymentId,
            status: paymentResponse.status,
            cardLast4: paymentResponse.cardLast4,
          },
        });

        return res.status(200).json({
          message: "Tour booked successfully",
          bookingId: booking._id,
          booking,
        });
      }
    );
  } catch (err) {
    console.error("Book tour error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// Fake external payment gateway
const fakePaymentGateway = ({ amount, currency, cardLast4, cardHolder }, callback) => {
  setTimeout(() => {
    callback(null, {
      status: "success",
      paymentId: "PAY_" + Date.now(),
      amount,
      currency,
      cardLast4,
      cardHolder,
    });
  }, 1000);
};
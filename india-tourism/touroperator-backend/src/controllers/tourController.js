// controllers/tourController.js
const mongoose = require("mongoose");
const Tour = require('../models/Tour');
const City = require('../models/City');
const State = require('../models/State');
const {Booking} = require("../models/Booking");
const { uploadImage } = require("../middleware/upload");
const multer = require("multer");
const getNextSequence = require("../utility/getNextSequence");

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
      tourOperator,
      tripLength,
      startDate,
      endDate,
      packageCost,
      nights,
      days,
      maxTourist,
      tourType,
      ticketCost,
      city,
      state,
      category,
      description,
      currency,
    } = req.body;

    // -------------------- Basic validations --------------------
    if (!tourOperator) return res.status(400).json({ error: "tourOperator is required" });
    if (!description || typeof description !== "string")
      return res.status(400).json({ error: "description must be a string" });

    const numericFields = {
      tripLength,
      packageCost,
      nights,
      days,
      maxTourist,
      ticketCost,
      city,
      state,
      category,
    };

    for (const [field, value] of Object.entries(numericFields)) {
      if (Number.isNaN(Number(value))) {
        return res.status(400).json({ error: `${field} must be a valid number` });
      }
    }

    if (!startDate || isNaN(Date.parse(startDate))) return res.status(400).json({ error: "Invalid startDate" });
    if (!endDate || isNaN(Date.parse(endDate))) return res.status(400).json({ error: "Invalid endDate" });
    if (new Date(endDate) <= new Date(startDate))
      return res.status(400).json({ error: "endDate must be after startDate" });

    if (!req.file) return res.status(400).json({ error: "Image is required" });

    // -------------------- Enum validation --------------------
    const validTourTypes = ["Domestic", "International"];
    // Normalize tourType to first letter uppercase
    const formattedTourType =
      tourType.charAt(0).toUpperCase() + tourType.slice(1).toLowerCase();
    if (!validTourTypes.includes(formattedTourType)) {
      return res.status(400).json({
        error: `tourType must be one of ${validTourTypes.join(", ")}`,
      });
    }

    // -------------------- Generate numeric _id --------------------
    const numericId = await getNextSequence("tour");

    // -------------------- Upload image --------------------
    const uploadMiddleware = uploadImage("tourImages", numericId);
    await new Promise((resolve, reject) => {
      uploadMiddleware(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // -------------------- Create tour --------------------
    const tour = await Tour.create({
      _id: numericId, // numeric ID
      tourOperator,
      tripLength: Number(tripLength),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      packageCost: Number(packageCost),
      nights: Number(nights),
      days: Number(days),
      maxTourist: Number(maxTourist),
      seatsLeft: Number(maxTourist), // auto calculate
      ticketCost: Number(ticketCost),
      tourType: formattedTourType,
      city: Number(city),
      state: Number(state),
      category: Number(category),
      description: description.trim(),
      currency: currency || "INR",
      image: {
        fileId: req.file.id,
        filename: req.file.filename,
      },
    });

    return res.status(201).json({
      message: "Tour created successfully",
      data: { tourId: tour._id },
    });

  } catch (err) {
    console.error("Create Tour error:", err);
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
    const { stateId, cityId , categoryId} = req.query;
    let filter ="";
    let tours = "";
    console.log('req username...',req.user);
    // derive tourOperatorId from logged-in user
    const userId = req.user._id;
    console.log('getAllTours for stateId , ', stateId , ' cityId ',  cityId);
    console.log('getAllTours for userId ', userId , ' having role ', req.user.roleID );
    if(req.user.roleID == '2') {
    filter = {
      //tourOperator: new mongoose.Types.ObjectId(userId),
      tourOperator: userId,
    };
  }
   if(stateId != undefined) {
    filter = {
      state: stateId,
    };
  }
  if(cityId != undefined) {
    filter = {
      city: cityId,
    };
  }
  if(categoryId != undefined) {
    filter = {
      category: categoryId,
    };
  }

  console.log('getAllTours filter ', filter );
  if(filter !=""){
    tours = await Tour.find(filter)
      .populate({ path: "city", select: "name" })
      .populate({ path: "state", select: "name" })
      .populate({ path: "tourOperator", select: "firstName lastName" })
      .populate({ path: "category", select: "name" }); // <-- populate category
  }else{
      tours = await Tour.find()
      .populate({ path: "city", select: "name" })
      .populate({ path: "state", select: "name" })
      .populate({ path: "tourOperator", select: "firstName lastName" })
      .populate({ path: "category", select: "name" }); // <-- populate category
  }
    if (!tours.length) {
      return res.status(404).json({
        message: "No tours found for the logged-in tour operator",
      });
    }

    const toursWithNames = tours.map(tour => ({
      ...tour.toObject(),
      cityName: tour.city?.name || null,
      stateName: tour.state?.name || null,
      tourOperatorName: tour.tourOperator
        ? `${tour.tourOperator.firstName} ${tour.tourOperator.lastName}`
        : null,
    }));

    res.json(toursWithNames);
  } catch (err) {
    console.error(err);
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
            .populate('tourOperator', 'name')
            .populate("category", "name"); // <-- populate category
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
    console.log("Updating tourId:", tourId,req.body["recommend"]);
    if (!tourId) 
      return res.status(400).json({ error: "Invalid tour ID" });

    // ----------------- Allowed fields now include categoryId
    const allowedFields = [
      "description", "state", "city", "category", "packageCost", "currency", "tourType",
      "startDate", "endDate", "days", "nights", "tripLength",
      "maxTourist", "seatsLeft", "ticketCost","recommend"
    ];

    const updates = {};
    allowedFields.forEach(f => {
      if (req.body[f] !== undefined) {
        updates[f] = ["packageCost","days","nights","tripLength","maxTourist","seatsLeft","ticketCost"].includes(f) 
          ? Number(req.body[f]) 
          : req.body[f];
      }
    });

    // ----------------- Handle image upload
    if (req.file) {
      updates.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        originalName: req.file.originalname,
      };
    }

    // ----------------- Validate dates
    if (updates.startDate && updates.endDate && new Date(updates.endDate) <= new Date(updates.startDate))
      return res.status(400).json({ error: "endDate must be after startDate" });

    // ----------------- Fetch existing tour
    let tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ error: "Tour not found" });

    // ----------------- Prevent manual seatsLeft update
    if (req.body.seatsLeft !== undefined && Number(req.body.seatsLeft) !== tour.seatsLeft) {
      return res.status(400).json({ 
        error: `seatsLeft cannot be updated manually. Current seatsLeft is ${tour.seatsLeft}` 
      });
    }

    // ----------------- Validate maxTourist vs existing booked seats
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

    // ----------------- Update tour
    tour = await Tour.findByIdAndUpdate(tourId, updates, { new: true, runValidators: true });
    console.log("Tour updated...")
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
      .populate("state", "name")
      .populate("city", "name")
     .populate({ path: 'tourOperator', select: 'firstName lastName' })
     .populate("category", "name"); // populates tour category name
  
  }else{
     if(!stateId == "" && cityId == "")
       // Query DB
      tours = await Tour.find({
              stateId})
            .populate("state", "name")
            .populate("city", "name")
            .populate({ path: 'tourOperator', select: 'firstName lastName' })
            .populate("category", "name"); // populates tour category name
        
      if(!cityId == "") 
        tours = await Tour.find({
              cityId})
            .populate("stateId", "name")
            .populate("city", "name")
            .populate({ path: 'tourOperator', select: 'firstName lastName' })
            .populate("category", "name"); // populates tour operator name

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
    const { persons, fromDate, toDate, payment } = req.body;

    // ---------------- Validations
    if (!tourId) {
      return res.status(400).json({ error: "Invalid tour ID" });
    }
    if (!persons || Number(persons) <= 0) {
      return res.status(400).json({ error: "Invalid number of persons" });
    }
    if (!fromDate || !toDate) {
      return res.status(400).json({ error: "From and To dates are required" });
    }
    if (!payment || payment.method !== "card" || !payment.cardNumber || !payment.cardName || !payment.expiry || !payment.cvv) {
      return res.status(400).json({ error: "Invalid or missing payment details" });
    }

    // ---------------- Fetch tour
    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ error: "Tour not found" });

    // ---------------- Seat availability
    if (tour.seatsLeft < persons) {
      return res.status(400).json({ error: `Only ${tour.seatsLeft} seats left` });
    }

    // ---------------- Calculate days & nights
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffMs = end - start;
    if (diffMs <= 0) return res.status(400).json({ error: "Invalid date range" });

    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const nights = days - 1;

    // ---------------- Calculate total amount
    const totalAmount = persons * tour.packageCost;

    // ---------------- Process payment (fake gateway)
    const paymentResponse = await new Promise((resolve, reject) => {
      fakePaymentGateway(
        {
          amount: totalAmount,
          currency: tour.currency || "INR",
          cardLast4: payment.cardNumber.slice(-4),
        },
        (err, response) => {
          if (err || response.status !== "success") return reject(new Error("Payment failed"));
          resolve(response);
        }
      );
    });

    // ---------------- Generate numeric booking ID
    const numericBookingId = await getNextSequence("booking");

    // ---------------- Create booking
    const booking = await Booking.create({
      _id: numericBookingId, // numeric ID
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

    // ---------------- Update seats
    tour.seatsLeft -= persons;
    await tour.save();

    return res.status(200).json({
      message: "Tour booked successfully",
      bookingId: booking._id, // numeric
      booking,
    });
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
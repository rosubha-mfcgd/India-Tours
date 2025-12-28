// controllers/tourController.js
const mongoose = require("mongoose");
const Tour = require('../models/Tour');
const City = require('../models/City');
const State = require('../models/State');
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
    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res.status(400).json({ error: "Invalid tour ID" });
    }

    // Allowed fields
    const allowedFields = [
      "description",
      "stateId",
      "cityId",
      "packageCost",
      "currency",
      "tourType",
      "startDate",
      "endDate",
      "days",
      "nights",
      "tripLength",
      "maxTourist",
      "seatsLeft",
      "ticketCost",
    ];

    // Build updates object from req.body
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        // Convert numeric fields
        if (["packageCost", "days", "nights", "tripLength", "maxTourist", "seatsLeft", "ticketCost"].includes(field)) {
          const numVal = Number(req.body[field]);
          if (isNaN(numVal)) {
            return res.status(400).json({ error: `${field} must be a valid number` });
          }
          updates[field] = numVal;
        } else {
          updates[field] = req.body[field];
        }
      }
    }

    // Handle optional image upload (memory storage)
    if (req.file) {
      updates.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        originalName: req.file.originalname,
      };
    }
    console.log('Updates to apply: ', updates);
    // ---------------- Logical Validations ----------------
    if (
      updates.seatsLeft !== undefined &&
      updates.maxTourist !== undefined &&
      updates.seatsLeft > updates.maxTourist
    ) {
      return res.status(400).json({ error: "seatsLeft cannot exceed maxTourist" });
    }

    if (
      updates.startDate !== undefined &&
      updates.endDate !== undefined &&
      new Date(updates.endDate) <= new Date(updates.startDate)
    ) {
      return res.status(400).json({ error: "endDate must be after startDate" });
    }

    if (updates.startDate && isNaN(Date.parse(updates.startDate))) {
      return res.status(400).json({ error: "startDate must be a valid date" });
    }

    if (updates.endDate && isNaN(Date.parse(updates.endDate))) {
      return res.status(400).json({ error: "endDate must be a valid date" });
    }

    // ---------------- Update Tour ----------------
    const tour = await Tour.findByIdAndUpdate(tourId, updates, {
      new: true,
      runValidators: true,
    });

    if (!tour) return res.status(404).json({ error: "Tour not found" });

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
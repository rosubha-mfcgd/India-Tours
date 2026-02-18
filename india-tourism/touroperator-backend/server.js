const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const tourOperatorRoutes = require("./routes/tourOperatorRoutes"); // import the user routes
const cityRoute = require('./routes/cityRoute');
const stateRoute = require('./routes/stateRoute');
const tourRoute = require('./routes/tourRoutes');
const imageRoute = require('./routes/imageRoutes');
const bookingRoute = require('./routes/bookingRoute');
const seedRoles = require("./utility/seedRoles"); // import the function
const seedStates = require("./utility/seedStates"); // import all Indian states
const seedCountries = require("./utility/seedCountries"); // import all Countries

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true,               // <--- IMPORTANT
}));
app.use(bodyParser.json());
app.use(cookieParser());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/admin/tour-operators", tourOperatorRoutes); 


// Tour Routes
app.use('/api/cities', cityRoute);
app.use('/api/states', stateRoute);
app.use('/api/tourdetails', tourRoute);
app.use('/api/imagedetails', imageRoute);
app.use('/api/booking', bookingRoute);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    //Seed countries after DB connection
    await seedCountries();
    console.log("MongoDB connected");
    // Seed roles after DB connection
    await seedRoles();
    //Seed states after DB connection
    await seedStates();
    
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));

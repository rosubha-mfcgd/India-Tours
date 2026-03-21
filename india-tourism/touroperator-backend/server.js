const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const authRoutes = require('./src/routes/authRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const tourOperatorRoutes = require('./src/routes/tourOperatorRoutes'); // import the user routes
const cityRoute = require('./src/routes/cityRoute');
const stateRoute = require('./src/routes/stateRoute');
const countryRoute = require('./src/routes/countryRoute');
const tourRoute = require('./src/routes/tourRoutes');
const imageRoute = require('./src/routes/imageRoutes');
const bookingRoute = require('./src/routes/bookingRoute');
const seedRoles = require('./src/utility/seedRoles'); // import the function
const seedStates = require('./src/utility/seedStates'); // import all Indian states
const seedCountries = require('./src/utility/seedCountries'); // import all Countries

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    credentials:true,  //access-control-allow-credentials:true
    methods: "GET, POST, PATCH, DELETE, PUT, OPTIONS",
    origin: ['http://localhost:3000', 'http://localhost:81'] ,// Whitelist the domains you want to allow
      allowedHeaders: "Content-Type, Authorization",
    optionSuccessStatus:200,
 }));
app.use(bodyParser.json());
app.use(cookieParser());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/admin/tour-operators", tourOperatorRoutes); 


// Tour Routes
app.use('/api/countries', countryRoute);
app.use('/api/cities', cityRoute);
app.use('/api/states', stateRoute);
app.use('/api/countries', stateRoute);
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

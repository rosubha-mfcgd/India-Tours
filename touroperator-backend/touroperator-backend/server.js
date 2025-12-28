const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const tourOperatorRoutes = require("./routes/tourOperatorRoutes"); // import the user routes
const cityRoute = require('./routes/cityRoute');
const stateRoute = require('./routes/stateRoute');
const tourRoute = require('./routes/tourRoutes');
const imageRoute = require('./routes/imageRoutes');
const seedRoles = require("./utility/seedRoles"); // import the function

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin/products", productRoutes);
app.use("/api/admin/tour-operators", tourOperatorRoutes); // use the user routes



// Tour Routes
app.use('/api/cities', cityRoute);
app.use('/api/states', stateRoute);
app.use('/api/tourdetails', tourRoute);
app.use('/api/imagedetails', imageRoute);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("MongoDB connected");
    // Seed roles after DB connection
    await seedRoles();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));

const express = require('express');
const app = express();
//loads environment variables from .env file into process.env
require("dotenv").config();
const PORT = process.env.PORT || 3050;;
//Route for handling user registration and login
const appRouter = require("./src/routers/hotelInfoRouters.js");
//code for using implemented routes
app.use("/api", appRouter);
// Define a base route
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

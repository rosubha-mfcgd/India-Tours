const State = require("../models/State"); // make sure your State model exists

const seedStates = async () => {
  try {
    const states = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
      "Delhi",
      "Jammu and Kashmir",
      "Ladakh",
      "Puducherry",
      "Chandigarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Andaman and Nicobar Islands",
      "Lakshadweep"
    ];

    for (const stateName of states) {
      const exists = await State.findOne({ name: stateName });
      if (!exists) {
        await State.create({ name: stateName });
        console.log(`State "${stateName}" created`);
      }
    }
  } catch (err) {
    console.error("Error seeding states:", err);
  }
};

module.exports = seedStates;

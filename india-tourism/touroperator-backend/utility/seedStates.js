const State = require("../models/State");
const getNextSequence = require("../utility/getNextSequence");

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
        // Generate numeric _id for the state
        const numericId = await getNextSequence("state");

        await State.create({
          _id: numericId,  // numeric _id
          name: stateName
        });

        console.log(`State "${stateName}" created with _id ${numericId}`);
      }
    }

    console.log("All states seeded successfully.");
  } catch (err) {
    console.error("Error seeding states:", err);
  }
};

module.exports = seedStates;

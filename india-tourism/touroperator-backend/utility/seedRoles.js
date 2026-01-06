const Role = require("../models/Role");
const Counter = require("../models/Counter");

const seedRoles = async () => {
  try {
    const roles = [
      { _id: 1, roleName: "superadmin" },
      { _id: 2, roleName: "touroperator" },
      { _id: 3, roleName: "user" },
    ];

    for (const role of roles) {
      const exists = await Role.findById(role._id);
      if (!exists) {
        await Role.create(role);
        console.log(`Role ${role.roleName} created`);
      }
    }

    // Sync role counter so future roles don’t collide
    await Counter.findOneAndUpdate(
      { _id: "role" },
      { $set: { seq: 3 } },
      { upsert: true }
    );
  } catch (err) {
    console.error("Error seeding roles:", err);
  }
};

module.exports = seedRoles;

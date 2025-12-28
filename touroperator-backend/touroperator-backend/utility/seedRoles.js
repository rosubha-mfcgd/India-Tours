const Role = require("../models/Role");

const seedRoles = async () => {
  try {
    const roles = [
      { roleID: 1, roleName: "superadmin" },
      { roleID: 2, roleName: "touroperator" },
      { roleID: 3, roleName: "user" }
    ];

    for (let role of roles) {
      const exists = await Role.findOne({ roleID: role.roleID });
      if (!exists) {
        await Role.create(role);
        console.log(`Role ${role.roleName} created`);
      }
    }
  } catch (err) {
    console.error("Error seeding roles:", err);
  }
};

module.exports = seedRoles;

const Role = require("../models/Role");

const seedCategory = async () => {
  try {
    const categories = [
      { categoryID: 1, categoryName: "Hill stations" },
      { categoryID: 2, categoryName: "Sea beach" },
      { categoryID: 3, categoryName: "Desert" },
      { categoryID: 4, categoryName: "Jungle safari" },
      { categoryID: 5, categoryName: "Religious places" },
      { categoryID: 6, categoryName: "City Vibes" },
      { categoryID: 7, categoryName: "Sports Tours" }
    ];

    for (let category of categories) {
      const exists = await Role.findOne({ categoryID: category.categoryID });
      if (!exists) {
        await Role.create(category);
        console.log(`Category ${category.categoryName} created`);
      }
    }
  } catch (err) {
    console.error("Error seeding categories:", err);
  }
};

module.exports = seedRoles;

const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const seedAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@contest.com" });

    if (existingAdmin) {
      console.log("✅ Admin user already exists");
      return;
    }

    await User.create({
      name: "System Admin",
      email: "admin@contest.com",
      password: "Admin@123",
      role: "ADMIN",
    });
    console.log("🎉 Admin user created: admin@contest.com / Admin@123");
  } catch (err) {
    console.error("❌ Error seeding admin user:", err.message);
  }
};

module.exports = seedAdminUser;

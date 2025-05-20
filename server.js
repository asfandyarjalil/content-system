require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/app");
const seedAdminUser = require("./src/seeder/admin.seeder");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("🟢 MongoDB connected");

    // 🔑 Seed admin after DB connection
    await seedAdminUser();

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB Connection Error:", err));

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

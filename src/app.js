const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
const roleRateLimiter = require("./middleware/roleRateLimiter.middleware");
app.use(roleRateLimiter());

// Routes
const authRoutes = require("./routes/auth.routes");
const contestRoutes = require("./routes/contest.routes");
const participationRoutes = require("./routes/participation.routes");
const leaderboardRoutes = require("./routes/leaderboard.routes");
const prizeRoutes = require("./routes/prize.routes");

app.use("/api/auth", authRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/participation", participationRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/prizes", prizeRoutes);

app.get("/", (req, res) => res.send("Contest System API Running"));

require("./cron/cron");
module.exports = app;

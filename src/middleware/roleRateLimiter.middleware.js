const rateLimit = require("express-rate-limit");

const roleLimits = {
  ADMIN: 1000,
  VIP: 500,
  NORMAL: 200,
  GUEST: 50,
};

module.exports = () => {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    max: (req) => {
      const role = req.user?.role || "GUEST";
      return roleLimits[role] || 50;
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

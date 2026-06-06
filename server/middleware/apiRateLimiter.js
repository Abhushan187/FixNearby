import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";

const createRateLimitHandler = (message) => {
  return (req, res) => {
    res.status(429).json({
      success: false,
      message,
    });
  };
};

// Extract user/worker ID from JWT without full verification (lightweight decode).
// Full verification is still handled by protect/protectWorker downstream.
const getAuthIdFromHeader = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.decode(token);
    if (decoded && decoded.id) {
      return decoded.id;
    }
  } catch {
    // Invalid token format — treat as anonymous
  }
  return null;
};

// Key generator: prefer JWT-derived ID, then req.user/_worker, then IP
const keyGenerator = (req) => {
  const authId = getAuthIdFromHeader(req);
  if (authId) {
    return authId;
  }
  if (req.user && req.user._id) {
    return req.user._id.toString();
  }
  if (req.worker && req.worker._id) {
    return req.worker._id.toString();
  }
  return req.ip;
};

// Tiered API limiter: anonymous (IP) vs authenticated (UserID)
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req) => {
    const isAuth =
      getAuthIdFromHeader(req) ||
      (req.user && req.user._id) ||
      (req.worker && req.worker._id);
    if (isAuth) {
      return 200; // Authenticated users
    }
    return 50; // Anonymous traffic
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
  handler: createRateLimitHandler(
    "Too many requests. Please try again later."
  ),
});
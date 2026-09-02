// In-Memory Rate Limiter Middleware for Sensitive Endpoints
const requestCounts = new Map();

export const rateLimiter = (options = {}) => {
  const windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes window
  const maxRequests = options.max || 20; // 20 requests per IP per window

  // Clean up stale IP records every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of requestCounts.entries()) {
      if (now > record.resetTime) {
        requestCounts.delete(ip);
      }
    }
  }, 5 * 60 * 1000);

  return (req, res, next) => {
    const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    let record = requestCounts.get(clientIp);

    if (!record || now > record.resetTime) {
      record = { count: 1, resetTime: now + windowMs };
      requestCounts.set(clientIp, record);
      return next();
    }

    record.count += 1;

    if (record.count > maxRequests) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        success: false,
        message: `Too many requests from this IP. Please try again after ${retryAfterSeconds} seconds.`
      });
    }

    next();
  };
};

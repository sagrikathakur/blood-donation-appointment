// HTTP Security Headers Middleware (OWASP Standard)
export const applySecurityHeaders = (req, res, next) => {
  // Hide Express server signature
  res.removeHeader('X-Powered-By');

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Prevent Clickjacking attacks
  res.setHeader('X-Frame-Options', 'DENY');

  // Enable Browser XSS Filtering
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Enforce HTTPS HSTS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Content Security Policy
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;");

  next();
};

const jwt = require('jsonwebtoken');

function authenticator(req, res, next) {
  const authHeader = req.headers['authorization'];
  // The token is expected to be in the format: 'Bearer <token>'
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ auth:false, error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Attach the decoded payload to the request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(403).json({ auth:false, error: 'Invalid or expired token.' });
  }
}

module.exports = { authenticator };
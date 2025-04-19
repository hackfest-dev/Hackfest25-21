function authorisor(allowedRoles = []) {
    return (req, res, next) => {
      const userRole = req.user?.role;
  
      if (!userRole) {
        return res.status(403).json({ error: 'No role information found in token.' });
      }
  
      if (!allowedRoles.includes(userRole.toLowerCase())) {
        return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
      }
  
      next();
    };
  }
  
  module.exports = { authorisor };
  
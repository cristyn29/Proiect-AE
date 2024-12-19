const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'LipseÈ™te headerul de autorizare!' });
  }

  const token = authHeader.split(' ')[1]; // Format: "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: 'Token lipsÄƒ!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded conÈ›ine datele din token (ex: {id:..., type:..., iat:..., exp:...})
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token invalid sau expirat!' });
  }
};

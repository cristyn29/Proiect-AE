module.exports = (req, res, next) => {
  // req.user este setat de middleware-ul auth (JWT)
  if (req.user && req.user.type === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Acces interzis! Nu ești admin.' });
};

const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'WHATS UP!!! Authenticated you are NOT?' });
  }
  next();
};
module.exports = { isAuthenticated };
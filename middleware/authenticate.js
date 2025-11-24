const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'WHATS UP!!! You have NOT been authenticated' });
  }
  next();
};
module.exports = { isAuthenticated };
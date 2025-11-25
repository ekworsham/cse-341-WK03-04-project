const router = require("express").Router();
const passport = require('passport');

router.use("/", require("./swagger"));
router.use("/trees", require("./trees"));
router.use("/shrubs", require("./shrubs"));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
  
    // Remove custom session store and destroy session
    if (req.session) {
      req.session.destroy(function(err) {
        // Clear the session cookie on the client and redirect to home
        try {
          res.clearCookie('connect.sid');
        } catch (e) {
          // ignore
        }
        // Ignore destroy error and redirect to home
        res.redirect('/');
      });
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
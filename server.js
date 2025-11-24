const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use(session({
    secret:"secret",
    resave: false , 
    saveUninitialized: false ,
  }))
  //This is the basic express session({...}) initialization.
  .use(passport.initialize())
  //init passport on every route call.
  .use(passport.session())
  //allow passport to use "express-session"
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader(
    'Access-Control-Allow-Methods', 
    'GET, POST, PUT, DELETE, OPTIONS, DELETE'
  );
  next();
})
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
  .use(cors({ origin: '*'}))
  .use("/", require("./routes/index.js"));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  //User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null, profile);
  //});
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  // Use Passport's `req.user` (populated when the session is authenticated)
  const user = req.user;
  res.send(user ? `logged in as ${user.displayName}` : 'Logged Out');
});

//*****************
// NEWCODE
// ***************** */
app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs' // leave session defaults so passport.create session works
}),
(req, res) => {
  // With passport.session() and serializeUser/deserializeUser you no longer need
  // req.session.user = req.user;  — Passport will set req.user for future requests.
  res.redirect('/');
});
//*****************
// ORIGINAL CODE
// ***************** */
// app.get('/github/callback', passport.authenticate('github', {
//   failureRedirect: '/api-docs', session: false
//   }),
//   (req, res) => {
//   req.session.user = req.user;
//   res.redirect('/');
// });

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);
    });
  }
  try {
    // getDatabase() returns the MongoClient; call .db() to access the active DB name
    console.log('Connected DB name:', mongodb.getDatabase().db().databaseName);
  } catch (e) {
    console.log('Connected to MongoDB client');
  }
});
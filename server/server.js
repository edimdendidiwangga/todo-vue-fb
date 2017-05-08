const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const Strategy = require('passport-local').Strategy;
const StrategyFB = require('passport-facebook').Strategy;
const passwordHash = require('password-hash');
const mongoose = require('mongoose')
require('dotenv').config();
const app = express()
app.use(cors())
mongoose.connect('mongodb://localhost/todo_vue')
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection success');
});

app.set('port', process.env.PORT || 3000)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token")
  next()
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/auth', require('./routes/auth'));
app.use('/todos', require('./routes/todos'));
app.use('/users', require('./routes/users'));

app.use(passport.initialize());
// app.use(passport.session());

passport.use(new Strategy(function(username, password, cb) {
  let User = require('./models/users')
  User.findOne({
    username: username
  }, function(err, user) {
    if (err) cb(err)
    if (passwordHash.verify(password, user.password)) {
      cb(null, user)
    } else {
      cb('Password is not correct ulang lagi bro')
    }
  })
}));

// passport.use(new StrategyFB({
//   clientID: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   callbackURL: 'http://localhost:3000/login/facebook/return'
// }, function(accessToken, refreshToken, profile, cb) {
//   // In this example, the user's Facebook profile is supplied as the user
//   // record.  In a production-quality application, the Facebook profile should
//   // be associated with a user record in the application's database, which
//   // allows for account linking and authentication with other identity
//   // providers.
//   return cb(null, profile);
// }));

// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });
//
// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });

app.listen(app.get('port'), function() {
  console.log('listening on port ' + app.get('port'))
})

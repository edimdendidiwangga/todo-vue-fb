const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passwordHash = require('password-hash');
const mongoose = require('mongoose')
const cors = require('cors');

const app = express()
app.use(cors())

mongoose.connect('mongodb://localhost/todo_vue')
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection success');
});

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/todos', require('./routes/todos'));
app.use('/users', require('./routes/users'));

app.use(passport.initialize());

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

app.listen(app.get('port'), function() {
  console.log('listening on port ' + app.get('port'))
})

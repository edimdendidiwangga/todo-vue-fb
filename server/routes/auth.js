const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/auth')

router.post('/signup', authController.signup)
router.post('/signin', passport.authenticate('local', {session: false}), authController.signin)
// app.get('/login/facebook',
//   passport.authenticate('facebook'));
// router.get('/signin/facebook', passport.authenticate('facebook'), authController.signin)

module.exports = router;

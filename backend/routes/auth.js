const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route for Google Authentication
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google Auth Callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

module.exports = router;

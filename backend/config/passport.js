const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: 'YOUR_GOOGLE_CLIENT_ID',
        clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
        callbackURL: '/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
            })
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    )
  );
};

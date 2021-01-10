const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/myapp/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }).exec((err, existingUser) => {
        if (err) {
          done(err);
        }
        if (existingUser) {
          done(null, { userId: existingUser._id, email: existingUser.email });
        } else {
          const user = User({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            password: null,
          });

          user.save((err, result) => {
            if (err) {
              done(err);
            }
            done(null, { userId: result._id, email: result.email });
          });
        }
      });
    }
  )
);

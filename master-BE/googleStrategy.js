const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { CLIENT_ID, CLIENT_SECRET } = require("./utility/config");
const { user } = require("./models/user");
const { student } = require("./utility/roleId");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "http://localhost:3001/api/v1/auth/google/callback",
      // passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async function (request, accessToken, refreshToken, profile, cb) {
      const checkEmail = await user.findOne({
        where: { email: profile.emails[0].value },
      });
      if (checkEmail) {
        cb(null, checkEmail);
      } else {
        const userDetails = {
          name: profile.displayName,
          email: profile.emails[0].value,
          gender: "male",
          image: profile.photos[0].value,
          phone: "1234567895",
          address: "India",
          password: "123456",
          department: "BCA",
          roleId: student,
        };
        const userData = await user.create(userDetails);
        if (userData) {
          return cb(null, userData);
        } else {
          return cb(null, false);
        }
      }
    }
  )
);

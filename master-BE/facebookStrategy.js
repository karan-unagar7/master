const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const { CLIENT_ID_FB, CLIENT_SECRET_FB } = require("./utility/config");
const {user}=require("./models/user")
const {student}=require("./utility/roleId")

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: CLIENT_ID_FB,
      clientSecret: CLIENT_SECRET_FB,
      callbackURL: "http://localhost:3001/api/v1/user/facebook/callback",
      profileFields: ['id', 'displayName', 'emails'],
      scope: ['email'],
      passReqToCallback: true
    },
    async function (request, accessToken, refreshToken, profile, cb) {
        console.log(profile);
      const checkEmail = await user.findOne({
        where: { email: profile.emails[0].value },
      });
      if (checkEmail) {
        cb(null, checkEmail);
      } else {
    
        // const userDetails = {
        //   name: profile.displayName,
        //   email: profile.emails[0].value,
        //   gender: "male",
        //   image: profile.photos[0].value,
        //   phone: 1234568912,
        //   address: "India",
        //   password: '123456',
        //   department:"BCA",
        //   roleId: student,
        // };
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

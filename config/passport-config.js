const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;

async function verifyCallback(username, password, done) {
  console.log("Auth called");
  try {
    const user = await User.findOne({ name: username });
    if (!user) return done(null, false, { message: "User not found" });
    if (await user.comparePassword(password)) return done(null, user);
    return done(null, false, { message: "Incorrect Password" });
  } catch (err) {
    return done(err);
  }
}

const startegy = new LocalStrategy(verifyCallback);

module.exports = function (passport) {
  passport.use(startegy);
  //express-session creates a req.session object
  //passport add passport to that object i.e req.session.passport
  //serializeUser recieves the authenticated user from Strategy and attach req.session.passport.user
  //basically translation of a user's session into user object
  passport.serializeUser(function (user, done) {
    console.log("Serialize User called");
    done(null, user.id);
  });

  //deserializeUser takes the last object attached to req.session.passport.user
  //and attach it to req.user
  passport.deserializeUser(async function (userId, done) {
    console.log("Deserialize user called");
    const user = await User.findById(userId);
    return done(null, user);
  });
};

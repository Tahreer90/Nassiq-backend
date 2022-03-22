const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const dotenv = require("dotenv");
const User = require("../models/User");
const bcrypt = require("bcrypt");
dotenv.config();

exports.localStrategy = new LocalStrategy(async (email, password, done) => {
  try {
    const user = await User.findOne({ username: email });
    const passwordMatch =
      user && (await bcrypt.compare(password, user.password));
    const error = new Error("username or password is wrong");
    error.status = 401;
    passwordMatch ? done(null, user) : done(error);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
  },
  async (jwtPayload, done) => {
    // console.log("object");
    if (Date.now() > jwtPayload.exp) {
      done(null, false);
    }
    try {
      const user123 = await User.findById(jwtPayload._id);
      user123 ? done(null, user123) : done(null, false);
    } catch (error) {
      done(error);
    }
  }
);

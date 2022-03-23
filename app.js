// imports
const express = require("express");
const cors = require("cors");
const connectDb = require("./database");
const passport = require("passport");
const dotenv = require("dotenv");
const path = require("path");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
dotenv.config();

// importing routes
const userRoutes = require("./api/users/routes");
const groupRoutes = require("./api/groups/routes");
const taskRoutes = require("./api/tasks/routes");

// init
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// request print on every request - middlewares
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

// middlewares
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routes
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/api/auth/", userRoutes);
app.use("/api/group/", groupRoutes);
app.use("/api/task/", taskRoutes);

// Error handiling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Path not found handleing
app.use((req, res, next) => {
  res.json({ msg: "path was not found" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
  connectDb();
});

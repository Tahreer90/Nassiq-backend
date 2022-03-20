const express = require("express");
const cors = require("cors");
const connectDb = require("./database");
const userRoutes = require("./api/users/routes");
const groupRoutes = require("./api/groups/routes");
const taskRoutes = require("./api/tasks/routes");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//Routes
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/api/auth/", userRoutes);
app.use("/api/group/", groupRoutes);
app.use("/api/:groupId/task/", taskRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});
app.listen(process.env.PORT || 5000, () => {
  connectDb();
});

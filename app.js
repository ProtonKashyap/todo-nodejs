//access .env variables
//Express uses a default error handler but in case of errors in async functions we have to pass the error using next() .So to reduce that boiler plate code we use this middleware
require("express-async-errors");

const express = require("express");
const path = require("path");
const flash = require("connect-flash");
const passport = require("passport");
require("./config/passport-config")(passport);

const connectionString =
  "mongodb+srv://Mohit:1234@nodeexpressprojects.ji47m59.mongodb.net/?retryWrites=true&w=majority";

//middlewares
const errorHanderMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");
const app = express();

//database configuration
const dotenv = require("dotenv");
const connectDB = require("./config/database");

//dotenv config
dotenv.config({ path: "./config/config.env" });

connectDB();

//routes
const authRouter = require("./routes/auth");

//Setting view engine and static assets
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

//setting up a session store
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "mySessions",
  databaseName:"Todo_Nodejs"
});

//setting up a session
app.use(
  session({
    secret: "Mysecret",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: store,
  })
);

store.on("error", function (error) {
  console.log(error);
});

//Parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
//Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(flash());
//setting up passportjs
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res, next) => {
  return res.render("homePage");
});

const { checkAuthenticated } = require("./util/utilityFunctions");
app.get("/dashboard", checkAuthenticated, function (req, res, next) {
  return res.render("dashboard", { name: req.user.name });
});
app.use("/auth", authRouter);
app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    return res.redirect("/");
  });
});
app.use(notFoundMiddleware);
app.use(errorHanderMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

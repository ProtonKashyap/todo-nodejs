//access .env variables
//Express uses a default error handler but in case of errors in async functions we have to pass the error using next() .So to reduce that boiler plate code we use this middleware
require("express-async-errors");

const express = require("express");
const path = require("path");
const flash = require("connect-flash");

//middlewares
const errorHanderMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");
const app = express();

//database configuration
const dotenv = require("dotenv");
const connectDB = require("./config/database");
dotenv.config({ path: "./config/config.env" });

connectDB();

//routes
const auth = require("./routes/auth");

//Setting view engine and static assets
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

//Parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
//Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(flash());

app.get("/", (req, res, next) => {
  return res.render("homePage");
});
app.use("/auth", auth);
app.use(notFoundMiddleware);
app.use(errorHanderMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

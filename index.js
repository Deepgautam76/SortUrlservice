//Server Entery Point
const express = require("express");
const cookieParser = require("cookie-parser");
const { checkForauthentication,restrictTo} = require("./middlewares/auth1");
const path = require("path");
const { connectToMongoDB } = require("./DatabaseConnection/connect");
const URL = require("./models/url");

const urlRoute = require("./routers/url");
const staticRoute = require("./routers/staticRouter");
const userRoute = require("./routers/user");

const app = express();
const PORT = 8001;

//MONGODB CONNECTION
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Mongodb Server Connected"))
  .catch((err) => console.log(err));

//EJS -For Server Side rendaring
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//This is added after refectoring the token auth2 code
app.use(checkForauthentication);


// // ROUTER
// app.use("/url", restrictTOLoggedinUserOnly, urlRoute);
// app.use("/user", userRoute);
// app.use("/", checkAuth, staticRoute);

//This is added after refectoring the token auth2 code
app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);


app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));


// lecture 26 time 13 minute
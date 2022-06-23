// dotenv config
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Calling the Express(), BodyParser, & a Static("public"), EJS Template to get extra styling and resources
const app = express();
app.use(express.static("public"));
// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());÷

/*=== MongoDB Connection Function===*/
connectDB();

// Port assigned to the server
const PORT = process.env.PORT || 3006;

// Dev Middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Dev MIddleware
/*app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});*/

/*======================= Routes Below ==========================*/ 
// ROUTES INPUT
const userRoutes = require("./routes/userRoutes");

// MOUNT ROUTE
app.use("/auth", userRoutes);

app.get("/", (req, res) => {
    res.json({message: "Access granted.."});
})


// App Server is listening on a specific port created...
app.listen(PORT, function () {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
});
require('dotenv').config();
const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const corsOptions = require("./config/CorsConfig/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3500;
connectDB();

//morgan logger
app.use(logger('dev'));

//assign credentials to header or request
app.use(credentials);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//middleware to handle form data
app.use(express.urlencoded({ extended: false }));

//middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// route handlers
app.use("/register", require("./routes/AuthRoutes/register"));
app.use("/login", require("./routes/AuthRoutes/login"));
app.use("/refresh", require("./routes/AuthRoutes/refresh"));
app.use("/logout", require("./routes/AuthRoutes/logout"));

app.use(verifyJWT);



mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})


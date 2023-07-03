require('dotenv').config();
const express = require("express");
const app = express();
const logger = require("morgan");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
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
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);


app.use(errorHandler);

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})


const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");


app.use(cookieParser());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const product = require("./routes/productRoute");
 const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
 app.use("/api/v1", user);
app.use("/api/v1", order);

module.exports = app;

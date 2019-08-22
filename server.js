const express = require("express");
const bodyParser = require("body-parser");
const employeeRoute = require("./routes/employee.route");
const roleRoute = require("./routes/role.route");
const appRoute = require("./routes/app.route");
const accountRoute = require("./routes/account.route");
const cookieParser = require("cookie-parser");

var app = express();


app.set('views', __dirname + '/public/views');
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');

app.use(express.urlencoded())
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(express.json());
app.use("/",appRoute);
app.use("/account",accountRoute);
app.use("/employee",employeeRoute);
app.use("/role",roleRoute);
app.use(cookieParser());

var server = app.listen(3000, function () {
    console.log('Server is running..');
});


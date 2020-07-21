

var express = require("express");
var cookieParser = require('cookie-parser');
var shortid = require("shortid");
var db = require("./db");

var booksRoute = require("./Route/books.route");
var usersRoute = require("./Route/users.route");
var transactionRoute = require("./Route/transactions.route");
var loginRoute = require("./Route/login.route");
// auth middleware
var authLogin = require("./middleware/middleware.login");
var authAdmin = require("./middleware/middleware.admin");
// our default array of dreams 
var count = 0;
var app = express();
var port = 9080;
//create a random string
var randomString = shortid.generate();
app.use(cookieParser(randomString)); // for cookies
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));// create static path

app.set("views", "./views"); //for template engine
app.set("view engine", "pug");

app.get("/", function(req, res){
	res.cookie('users-id-home', shortid.generate());
  	res.render("home");
  	if(req.cookies) {
  		count++;
  	}
  	console.log('cookes:', count);
})
//Link here:
//Login
app.use("/login", loginRoute);
//Books
app.use("/books", booksRoute);
//Users
app.use("/users", authLogin.requireAuth, usersRoute);
//Transactions
app.use("/transactions", authLogin.requireAuth, authAdmin.admin, transactionRoute);

// listen for requests :)
 
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

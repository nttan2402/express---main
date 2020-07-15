var express = require("express");
var cookieParser = require('cookie-parser');
var shortid = require("shortid");
var db = require("./db");
var booksRoute = require("./Route/books.route");
var usersRoute = require("./Route/users.route");
var transactionRoute = require("./Route/transactions.route");
// our default array of dreams 
var count = 0;
var app = express();
var port = 9080;
app.use(cookieParser());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("views", "./views");
app.set("view engine", "pug");
app.get("/", function(req, res){
	res.cookie('users-id', shortid.generate());
  	res.render("home");
  	if(req.cookies) {
  		count++;
  	}
  	console.log('cookes:', count);
})
//Books
app.use("/books", booksRoute);
//Users
app.use("/users", usersRoute);
//Transactions
app.use("/transactions", transactionRoute);

// listen for requests :)

const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

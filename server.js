var express = require("express");
var db = require("./db");
var booksRoute = require("./Route/books.route");
var usersRoute = require("./Route/users.route");
var transactionRoute = require("./Route/transactions.route");
// our default array of dreams 

var app = express();
var port = 9080;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("views", "./views");
app.set("view engine", "pug");
app.get("/", function(req, res){
  res.render("home")
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

var db = require("../db");
var shortid = require("shortid");

module.exports.index = function(req, res) {
  res.render("login/login");
}

module.exports.postLogin = function(req, res) {

	var user = req.body.user; 
	var password = req.body.password;

	var match = db.get("users").find({name : user}).value();

	if(!match) {
		res.render("login/login", {
			errors: [
			"user doesn't exists."
			],
			values : user
		});
		return;// if false return immediately and not run into logic below
	}

	if(match.password !== password) {
		res.render("login/login", {
			errors: [
			"Wrong password."
			] 
		});
		return;// if false return immediately and not run into logic below
	}
	res.cookie("userId", match.id); //if true, server send a cookie to client :)
	res.redirect("/users"); // redirect to users url include cookie. 
	//it is checked by the middleware of the user link
}

// this page login to website. not a middleware.
var db = require("../db");
var shortid = require("shortid");

module.exports.index = function(req, res) {
  res.render("login/login");
}

module.exports.postLogin = function(req, res) {

	var user = req.body.user; //ngyen thanh tan
	var password = req.body.password;

	var match = db.get("users").find({name : user}).value();

	if(!match) {
		res.render("login/login", {
			errors: [
			"user doesn't exists."
			],
			values : user
		});
		return;
	}

	if(match.password !== password) {
		res.render("login/login", {
			errors: [
			"Wrong password."
			] 
		});
		return;
	}
	res.cookie("userId", match.id);
	res.redirect("/users");
}
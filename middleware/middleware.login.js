var db = require("../db");

module.exports.requireAuth = function(req, res, next) {

	if(!req.cookies.userId) { //take cookie at client 
		res.redirect("/login");
		return;
	}
	
	var user = db.get("users").find({ id: req.cookies.userId}).value();
	//compare to database
	if(!user) {
		res.redirect("/login");
		return;
	}
	next();// if cookie in database so next
}
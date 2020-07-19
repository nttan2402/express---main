var db = require("../db");

module.exports.requireAuth = function(req, res, next) {

console.log('signedCookies', req.signedCookies);
console.log('cookies', req.cookies);
	if(!req.signedCookies.userId) { //if cookie false --> back user to login page (not user)
		//with cookie, user can login users page.
		res.redirect("/login");
		return;
	}
	//if they have a cookie, check cookie in database (except for fake cookie)
	var user = db.get("users").find({ id: req.signedCookies.userId}).value();


	//compare to database
	if(!user) {
		res.redirect("/login");
		return;
	}

	res.locals.user = user;

	next();// if cookie in database so next

}
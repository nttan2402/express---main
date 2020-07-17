var db = require("../db");

module.exports.admin = function(req, res, next) {

	if(!req.cookies.userId) { //if cookie false --> back user to login page (not user)
		//with cookie, user can login users page.
		res.redirect("/login");
		return;
	}
	//if they have a cookie, check cookie in database (except for fake cookie)
	var user = db.get("users").find({ id: req.cookies.userId}).value(); //convert cookie--> user
	
	if(!user) { //if fake cookie redirect to login page
		res.redirect("/login");
		return;
	}
	//real cookie
	//if it is not admin --> redirect to transaction
	if(user.isAdmin) {
		next();//if it is admin
	}else {
		var value = db.get("transactions").filter({user: user.name}).value();
		res.render("./transactions/transaction", { transaction: value,
													name: user.name });
	}
}
	
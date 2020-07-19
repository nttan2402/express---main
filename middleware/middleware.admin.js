var db = require("../db");

module.exports.admin = function(req, res, next) {
	var user = db.get("users").find({ id: req.cookies.userId}).value(); //convert cookie--> user
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
	
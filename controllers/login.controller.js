var md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var db = require("../db");
var shortid = require("shortid");

module.exports.index = function(req, res) {
  res.render("login/login");
}

module.exports.postLogin = function(req, res) {

	var user = req.body.user; //ngyen thanh tan
	var password = req.body.password;
	// var hashpassword = md5(password);
	console.log('postLogin', req.body )
	var match = db.get("users").find({name : user}).value();
	console.log(match);
	var hash = match.password;
	
	if(match.wrongLoginCount <= 4) {
		if(!match) { //check user

			res.render("login/login", {
				errors: [
				"user doesn't exists."
				],
				values : user
			});
			return;// if false return immediately and not run into logic below
		}

	    if(!bcrypt.compareSync(password, hash)) { //check password
	    	//Count
	    	match.wrongLoginCount++;
	    	//save into database
	    	 db.get("users")
		      .find({name : user})
		      .assign(match)
		      .write();
		      //render
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
	}else {
			res.render("login/login", {
				errors: [
				"Your account is blocked"
				] 
			});
	}

	
}

// this page login to website. not a middleware.
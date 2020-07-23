const sgMail = require('@sendgrid/mail'); //send grid email

var md5 = require('md5');
var bcrypt = require('bcrypt');
var saltRounds = 10;
var db = require("../db");
var shortid = require("shortid");




module.exports.index = function(req, res) {
  res.render("login/login");
}

module.exports.postLogin = function(req, res) {

	var user = req.body.user; //ngyen thanh tan
	var password = req.body.password;
	// var hashpassword = md5(password);
	
	var match = db.get("users").find({name : user}).value();
	console.log(match);
	if(!match) { //check user

			res.render("login/login", {
				errors: [
				"user doesn't exists."
				],
				values : user
			});
			return;// if false return immediately and not run into logic below
		}

	
	if(match.wrongLoginCount <= 4) {
		
	    if(!bcrypt.compareSync(password, match.password)) { //check password
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
		res.cookie("userId", match.id, { signed: true}); //if true, server send a cookie to client :)
		res.redirect("/users"); // redirect to users url include cookie. 
		//it is checked by the middleware of the user link
	}else {
			console.log(match.email);
			sgMail.setApiKey(process.env.SENDGRID_API_KEY);
			const msg = {
			  to: match.email, //getdata
			  from: 'nttan.env@gmail.com',
			  subject: 'Your account is blocked',
			  text: 'Your account is blocked cause wrong too much',
			  html: '<strong>Your account is blocked cause wrong too much</strong>',
			};
			sgMail.send(msg, function(error, info){
				if(error){
					return console.log(error);
				}
				console.log('send success!')
			});
			res.render("login/login", {
				errors: [
				"Your account is blocked"
				] 
			});
	}

	
}

// this page login to website. not a middleware.
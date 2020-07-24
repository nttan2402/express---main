
var db = require("../db");
var shortid = require("shortid");
//create Password
var bcrypt = require('bcrypt');
var saltRounds = 10;
var myPlaintextPassword = '123123';

module.exports.index = function(req, res) {
  res.render("./users/users", { users: db.get("users").value() });
} 

module.exports.update = function(req, res) {
  var user = db.get("users")
              .find({ id: req.params.id })
              .value();
  res.render("./users/update", { oldname: user.name,
                                  id: user.id
                                  });
}

module.exports.postUpdate = function(req, res) {
  db.get("users")
    .find({ id: req.params.id })
    .assign(req.body)
    .write();
  res.redirect("/users");
}

module.exports.postDelete = function(req, res) {
  db.get("users")
    .remove({ id: req.params.id })
    .write();
  res.redirect("/users");
}

module.exports.create = function(req, res) {
  res.render("./users/create");
}

module.exports.postCreate = function(req, res) {
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
      req.body.password = hash;
      req.body.id = shortid.generate();
      req.body.isAdmin = false;
      req.body.wrongLoginCount = 0;
      req.body.avatar = req.file.path.slice(7);
      db.get("users")
        .push(req.body)
        .write();
      res.redirect("/users");
  });

}
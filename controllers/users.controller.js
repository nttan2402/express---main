
var db = require("../db");
var shortid = require("shortid");

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
  req.body.id = shortid.generate();
  req.body.password = "123123";
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
}
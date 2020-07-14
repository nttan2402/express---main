var db = require("../db");
var shortid = require("shortid");

module.exports.index = function(req, res) {
  res.render("index", { databooks: db.get("databooks").value() });
}
module.exports.postIndex = function(req, res) {
  req.body.id = shortid.generate();
  db.get("databooks")
    .push(req.body) 
    .write();
  res.redirect("/books");
}
module.exports.postUpdate = function(req, res) {
  req.body.id = shortid.generate();
  db.get("databooks")
    .find({ title: req.params.title })
    .assign({ title: req.body.title })
    .write();
  res.redirect("/books");
}
module.exports.postDelete = function(req, res) {
  db.get("databooks")
    .remove({ title: req.params.title })
    .write();
  res.redirect("/books");
}

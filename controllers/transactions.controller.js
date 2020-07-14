var db = require("../db");
var shortid = require("shortid");

module.exports.index = function(req, res) {
  res.render("transactions", { transactions: db.get("transactions").value() });
};

module.exports.create = function(req, res) {
  res.render("createTransaction", {
    databooks: db.get("databooks").value(),
    users: db.get("users").value(),
    isComplete: db.get("transactions").value()
  });
};
module.exports.postCreate = function(req, res){
  req.body.id = shortid.generate();
  req.body.isComplete = false;
  db.get("transactions").push(req.body).write();
  res.redirect("/transactions")
}
module.exports.isComplete = function (req, res) {
  var abv= db.get('transactions')
  .find(req.params)
  .assign(req.body)
  .write();
  res.redirect("/transactions")
}


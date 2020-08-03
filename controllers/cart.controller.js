var db = require("../db");
var shortid = require("shortid");

module.exports.addToCart = function(req, res, next) {
  var productId = req.params.productId;
  console.log(productId);
  var sessionId = req.signedCookies.sessionId;
  console.log(sessionId);

  if(!sessionId) {
    res.redirect("/products");
    return
  }else {
     var count = db.get("sessions")
              .find({ id : sessionId})
              .get('cart.'+ productId, 0)
              .value();

  db.get("sessions")
  .find({ id : sessionId })
  .set('cart.' + productId, count + 1)
  .write();

  res.redirect("/products");
  }

 
}

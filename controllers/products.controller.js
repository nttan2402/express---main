var db = require("../db");



module.exports.index = function(req, res) {
	var page = parseInt(req.query.page) || 1;// n(2)
	var perPage = 8;
	
	var start = (page - 1)*perPage;//0-8
	var end = page* perPage;//8-16

	if(page === 1) {
		 res.render("products/products", {
		  	products: db.get('products').value().slice(start, end),
		  	pagePrevious: page,
		  	page: page + 1,
		  	pageNext: page + 2
		  });
		}else {
		  res.render("products/products", {
		  	products: db.get('products').value().slice(start, end),
		  	pagePrevious: page -1,
		  	page: page,
		  	pageNext: page + 1
		  });
		}

}

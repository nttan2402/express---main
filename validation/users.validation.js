module.exports.postCreate = function(req, res, next) {
	 var errors = [];

  if(!req.body.name) {
    errors.push('Name is required')
  }

  if(!req.body.age) {
    errors.push('Age is required')
  }
  if(!req.body.email) {
    errors.push('Email is required')
  }

  if(errors.length) {
    res.render("./users/create", {
      errors: errors,
      values: req.body
    })
    return;
  }
  next();
}

var db = require("../db");
var shortid = require("shortid");
var cloudinary = require('cloudinary').v2;
//config
cloudinary.config({ 
  cloud_name: 'nttan2402', 
  api_key: '464718799829179', 
  api_secret: 'osxwk6Qqd1SRLFRNZmA7s5viR9Q' 
});

//create Password
var bcrypt = require('bcrypt');
var saltRounds = 10;
var myPlaintextPassword = '123123';

module.exports.index = function(req, res) {
  res.render("./users/users", { users: db.get("users").value() });
} 

module.exports.update = function(req, res) {
  var value = db.get("users")
              .find({ id: req.params.id })
              .value();
  res.render("./users/update", { user: value
                                  });
}

module.exports.getAvatar = function(req, res) {
  var user = db.get("users")
              .find({ id: req.params.id })
              .value();
  res.render("./users/updateAvatar" , { user: user
                                  });
}

module.exports.postAvatar = function(req, res) {
  req.body.avatar = req.file.path.slice(7);
  // req.body.avatarUrl = '';
  cloudinary.uploader.upload(req.file.path, 
                      { folder: "coderX" }, 
                        function (err, image) {
                console.log();
                console.log("** File Upload");
                console.log(image.url)
                req.body.avatarUrl = image.url;
                if (err) { console.warn(err); }
                   db.get("users")
                  .find({ id: req.params.id })
                  .assign(req.body)
                  .write();
                res.redirect("/users");
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
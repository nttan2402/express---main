var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");

var adapter = new FileSync("db.json");
var db = low(adapter);

db.defaults({
  databooks: [],
  sessions : [],
  users: [],
  transactions: [{
      "name": "thanhtan",
      "age": "27",
      "email": "nttan.1@gmail.com",
      "id": "ZCOW2o7AF",
      "password": "123123",
      "isAdmin": true
    }]
}).write();

module.exports = db;

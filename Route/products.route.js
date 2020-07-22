var express = require("express");
var router = express.Router();
var controller = require("../controllers/products.controller.js");

router.get("/", controller.index);

module.exports = router;
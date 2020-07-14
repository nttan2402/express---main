var express = require("express");
var router = express.Router();
var controller = require("../controllers/users.controller");

router.get("/", controller.index);
router.get("/update/:name", controller.update);
router.post("/update/:name", controller.postUpdate);
router.post("/delete/:name", controller.postDelete);
router.get("/create", controller.create);
router.post("/create", controller.postCreate);

module.exports = router;

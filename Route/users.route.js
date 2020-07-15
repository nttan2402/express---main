var express = require("express");
var router = express.Router();
var controller = require("../controllers/users.controller");
var validation = require("../validation/users.validation");

router.get("/", controller.index);
router.get("/update/:name", controller.update);
router.post("/update/:name", controller.postUpdate);
router.post("/delete/:name", controller.postDelete);
router.get("/create", controller.create);
router.post("/create", validation.postCreate, controller.postCreate);

module.exports = router;

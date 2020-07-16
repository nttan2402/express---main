var express = require("express");
var router = express.Router();
var controller = require("../controllers/users.controller");
var validation = require("../validation/users.validation");


router.get("/", controller.index);
router.get("/update/:id", controller.update);
router.post("/update/:id", controller.postUpdate);
router.post("/delete/:id", controller.postDelete);
router.get("/create", controller.create);
router.post("/create", validation.postCreate, controller.postCreate); //middle ware

module.exports = router;

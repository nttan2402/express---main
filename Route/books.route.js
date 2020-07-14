var express = require("express");
var router = express.Router();
var controller = require("../controllers/books.controller");

router.get("/", controller.index);
//ADD
router.post("/", controller.postIndex);
//UPDATE
router.post("/update/:title", controller.postUpdate);
//DELETE
router.post("/delete/:title", controller.postDelete);

module.exports = router;

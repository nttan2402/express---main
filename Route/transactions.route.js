var express = require('express')
var router = express.Router()
var controller = require('../controllers/transactions.controller')

router.get("/", controller.index)
router.get("/create", controller.create);
router.post("/create", controller.postCreate);
router.post("/:id" + "/complete", controller.isComplete);
module.exports = router;
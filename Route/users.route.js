var express = require("express");
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });
var router = express.Router();

	
var controller = require("../controllers/users.controller");
var validation = require("../validation/users.validation");


router.get("/", controller.index);

router.get("/update/:id" + "/profile", controller.update);
router.post("/update/:id" + "/profile", controller.postUpdate);
router.post("/delete/:id", controller.postDelete);

router.get("/update/:id" + "/profile/avatar", controller.getAvatar);
router.post("/update/:id" + "/profile/avatar", upload.single('avatar'), controller.postAvatar);

router.get("/create", controller.create);
router.post("/create", 
			upload.single('avatar'), 
			validation.postCreate, 
			controller.postCreate
			); //middle ware

module.exports = router;

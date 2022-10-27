// Attribution des controllers aux endpoints correspondantes aux "users", les controllers sont les fonctions SignUp et Login définies dans le user_controller

const express           = require("express");
const user_controller   = require("../controllers/user");

const router            = express.Router();

router.post("/signup",  user_controller.SignUp);
router.post("/login",   user_controller.Login);

module.exports  = router;
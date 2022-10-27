// Attribution des controllers aux endpoints correspondantes aux "posts", les controllers sont les fonctions comme GetAllPosts, CreatePost, définies dans le post_controller

const express           = require("express");
const auth              = require("../middlewares/auth");
const post_controller  = require("../controllers/post");

const router = express.Router();

router.get      ("/user", auth, post_controller.GetUser);
router.get      ("/all",  auth, post_controller.GetAllPosts);
router.get      ("/:id",  auth, post_controller.GetOnePost);
router.post     ("/",     auth, post_controller.CreatePost);
router.put      ("/:id",  auth, post_controller.ModifyPost);
router.delete   ("/:id",  auth, post_controller.DeletePost);
router.post     ("/like", auth, post_controller.Like);

module.exports = router;
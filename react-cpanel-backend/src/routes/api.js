const express = require("express");
const router = express.Router();
const PostController = require('../controllers/PostController');
const { upload } = require("../services/PostService");

router.get("/post", PostController.PostList)
router.get("/post/:id", PostController.PostDetails)
router.post("/post", upload.single("postImg"), PostController.AddPost)

module.exports = router
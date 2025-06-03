const express = require("express");
const {
  getCommentsByProductId,
  postNewComment,
} = require("../Controllers/comments-controllers");
const ensureAuthorized = require("../Middlewares/auth");
const router = express.Router();

router.post("/post-comment", postNewComment);
router.get("/:productId", getCommentsByProductId);

module.exports = router;

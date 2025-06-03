const express = require("express");
const { loginUser, registerUser } = require("../Controllers/user-controllers");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;

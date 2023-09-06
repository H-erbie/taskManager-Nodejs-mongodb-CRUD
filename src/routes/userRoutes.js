const express = require("express");
const router = express.Router();
const {
  currentUser,
  login,
  register,
} = require("../controllers/userController");
const validToken = require("../middleware/tokenHandler");

router.post("/register", register);
router.post("/login", login);
router.get("/current", validToken, currentUser);
module.exports = router;

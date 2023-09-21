const express = require("express");
const { registerUsers, loginUsers } = require("../controller/usersController");
const {
  registerBody,
  handleValidationErrors,
  loginBody,
} = require("../middleware/validatesBody");

const router = express.Router();

router.post("/register", registerBody, handleValidationErrors, registerUsers);
router.post("/login", loginBody, handleValidationErrors, loginUsers);

module.exports = router;

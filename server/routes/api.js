const express = require("express");
const userRoutes = require("./users");
const taskRoutes = require("./task");

const router = express.Router();

router.use('/auth', userRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;

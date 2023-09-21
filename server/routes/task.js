const express = require("express");
const { createTask, getAllTasks } = require("../controller/taskController");
const {
  taskBody,
  handleValidationErrors,
} = require("../middleware/validatesBody");
const upload = require("../middleware/uploadImage");

const router = express.Router();

router.post(
  "/create",
  upload.single("image"),
  taskBody,
  handleValidationErrors,
  createTask
);

router.get('/all-tasks', getAllTasks)

module.exports = router;

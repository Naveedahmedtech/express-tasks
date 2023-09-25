const express = require("express");
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controller/taskController");
const {
  taskBody,
  handleValidationErrors,
} = require("../middleware/validatesBody");
const upload = require("../middleware/uploadImage");

const router = express.Router();

router.post(
  "/create",
  upload.single("file"),
  taskBody,
  handleValidationErrors,
  createTask
);
router.put("/update-task/:id", upload.single("file"), updateTask);
router.delete("/delete-task/:id", deleteTask);
router.get("/all-tasks", getAllTasks);

module.exports = router;

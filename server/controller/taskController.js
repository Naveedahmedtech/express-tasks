const Task = require("../model/task");
const path = require("path");

module.exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { filename } = req.file;

      const task = await Task.create({
          title: title,
          description,
          image: filename
      })

    res.status(200).json({ message: "Task created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


module.exports.getAllTasks = async (req, res) => { 
    try {
        const tasks = await Task.find({})
        if (!tasks) {
            res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({tasks})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

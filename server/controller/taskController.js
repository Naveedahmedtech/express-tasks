const Task = require("../model/task");
const path = require("path");

module.exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    let taskData = {
      title,
    };

    if (description && description.trim() !== "") {
      taskData.description = description;
    }

    if (req.file) {
      taskData.image = req.file.filename;
    }

    const task = await Task.create(taskData);

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


module.exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    let filename = req.file ? req.file.filename : undefined;

    const findTask = await Task.findById(id);

    if (!findTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedFields = {
      title: title || findTask.title,
      description: description || findTask.description,
      image: filename || findTask.image,
    };

    await Task.updateOne({ _id: id }, updatedFields);
    res.status(200).json({ message: "Task updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



module.exports.deleteTask = async (req, res) => { 
  try {
    const { id } = req.params;
    const findTask = await Task.findById(id);
    if (!findTask) {
      res.status(404).json({ message: "Task not found" });
    }
    await Task.deleteOne(findTask)
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
}

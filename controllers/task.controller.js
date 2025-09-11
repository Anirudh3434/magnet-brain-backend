import Task from "../models/task.model.js";

// ---------------------- CREATE TASK ----------------------
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo } = req.body;

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      createdBy: req.user.id,
      assignedTo,
    });

    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------- GET ALL TASKS ----------------------
export const getTasks = async (req, res) => {
  try {
    const { page , limit } = req.query;

    const tasks = await Task.find({$or: [{createdBy: req.user.id} , {assignedTo : req.user.id}]})
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ dueDate: 1 });

    const total = await Task.countDocuments();

    res.json({ total, page, tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------- GET SINGLE TASK ----------------------
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------- UPDATE TASK ----------------------
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------- DELETE TASK ----------------------
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------- UPDATE STATUS ----------------------
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = status;
    await task.save();

    res.json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------- UPDATE PRIORITY ----------------------
export const updateTaskPriority = async (req, res) => {
  try {
    const { priority } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.priority = priority;
    await task.save();

    res.json({ message: "Task priority updated", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
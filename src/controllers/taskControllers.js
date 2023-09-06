const asyncHandler = require("express-async-handler");
const TaskModels = require("../modals/taskModels");

//get all tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await TaskModels.find({user_id: req.user.id});
  res.status(200).json(tasks);
});

//create new task
const createTask = asyncHandler(async (req, res) => {
  console.log("task", req.body);
  const { task, completed } = req.body;
  if(!task ||completed == undefined){
    res.status(400);
    throw new Error ('All fields are mandatory')

}
  const tasks = await TaskModels.create({
    task,
    completed,
    user_id: req.user.id
  });
  res.status(201).json(tasks);
});

//get a single task
const getTask = asyncHandler(async (req, res) => {
  const task = await TaskModels.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found!");
  }
  res.status(200).json(task);
});

//update a task
const updateTask = asyncHandler(async (req, res) => {
  const Task = await TaskModels.findById(req.params.id);
  if (!Task) {
    res.status(404);
    throw new Error("Task not found!");
  }
  if(Task.user.id.toString() !== req.user.id){
    res.status(403)
    throw new Error ('User does not have permission to delete other user contacts')
  }
  const updatedTask = await TaskModels.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTask);
});

//delete a task
const deleteTask = asyncHandler(async (req, res) => {
  const task = await TaskModels.findByIdAndDelete(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found!");
  }
  if(Task.user.id.toString() !== req.user.id){
    res.status(403)
    throw new Error ('User does not have permission to delete other user contacts')
  }
  res.status(200).json(task);
});
module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
};

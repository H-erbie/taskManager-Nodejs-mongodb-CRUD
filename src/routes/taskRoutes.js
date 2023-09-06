const express = require("express");
const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} = require("../controllers/taskControllers");
const validToken = require("../middleware/tokenHandler");
router.use(validToken)


router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask)
module.exports = router;

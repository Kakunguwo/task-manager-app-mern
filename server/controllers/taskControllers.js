import HttpError from "../models/errorModel.js";
import Task from "../models/taskModel.js";

//CREATE TASK
//API: api/task/create

//Protected
export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return next(HttpError("Fill all fields", 421));
    }

    const newTask = await Task.create({
      title,
      description,
      userId: req.user.id,
    });

    if (!newTask) {
      return next(HttpError("Failed to create task", 422));
    }

    res.status(200).json(newTask);
  } catch (error) {
    console.log(error);
    return next(HttpError("Something went wrong", 500));
  }
};

//Get task by the user
//API : api/task/user/:id
//Protected
export const myTasks = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id !== req.user.id) {
      return next(HttpError("Cannot get tasks", 421));
    }

    const tasks = await Task.find({ userId: id });

    if (!tasks || tasks.length === 0)
      return next(HttpError("Cannot find tasks", 404));

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return next(HttpError("Something went wrong", 500));
  }
};

//Get a task
//API: api/task/:id
//Protected

export const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(HttpError("Task not found", 404));
    };

    const task = await Task.findById(id);

    if(!task){
      return next(HttpError("Task not found", 404));
    }

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return next(HttpError("Something went wrong", 500));
  }
}

//Update task
//API: api/task/:id
//Protected

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(HttpError("Task not found", 404));
    }
    const { title, description } = req.body;
    if (!title || !description) {
      return next(HttpError("Fill all fields", 421));
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );

    if (!updatedTask) return next(HttpError("Failed to update task"));

    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
    return next(HttpError("Something went wrong", 500));
  }
};

//Delet task
//API: api/task/:id
//Protected
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(HttpError("Task not found", 404));
    }
    const task = await Task.findByIdAndDelete(id);
    if(!task) return next(HttpError("Failed to delte task"));
    res.status(200).json("Task deleted");
  } catch (error) {
    console.log(error);
    return next(HttpError("Something went wrong", 500));
  }
};

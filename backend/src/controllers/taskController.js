import { 
    createTaskService, 
    deleteTaskService, 
    getAllTasksService, 
    getTaskByIdService, 
    updateTaskService 
} from "../models/taskModel.js";

const handleResponse = (res, status, message, data=null) => {
    return res.status(status).json({
        status,
        message,
        data
    });
}

export const createTask = async (req, res, next) => {
    const { name, description, startDate, endDate, completed } = req.body;
    try {
        const newTask = await createTaskService(name, description, startDate, endDate, completed);
        handleResponse(res, 201, "Task created successfully", newTask);
    } catch (err) {
        next(err);
    }
}

export const getAllTasks = async (req, res, next) => {  
    try {
        const tasks = await getAllTasksService();
        handleResponse(res, 200, "Tasks fetched successfully", tasks);
    } catch (err) {
        next(err);
    }
}

export const getTaskById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await getTaskByIdService(id);
        if (!task) {
            return handleResponse(res, 404, "Task not found");
        }
        handleResponse(res, 200, "Task fetched successfully", task);
    } catch (err) {
        next(err);
    }
}

export const updateTask = async (req, res, next) => {
    const { id } = req.params;
    const { name, description, startDate, endDate, completed } = req.body;
    try {
        const taskToBeUpdated = await updateTaskService(id, name, description, startDate, endDate, completed);
        if (!taskToBeUpdated) {
            return handleResponse(res, 404, "Task not found");
        }
        handleResponse(res, 200, "Task updated successfully", taskToBeUpdated);
    } catch (err) {
        next(err);
    }
}

export const deleteTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const taskToBeDeleted = await deleteTaskService(id);
        if (!taskToBeDeleted) {
            return handleResponse(res, 404, "Task not found");
        }
        handleResponse(res, 200, "Task deleted successfully", taskToBeDeleted);
    } catch (err) {
        next(err);
    }
}
import pool from "../config/db.js";

export const getAllTasksService = async () => {
    try {
        const result = await pool.query("SELECT * FROM tasks");
        return result.rows;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return json({ error: "Internal Server Error" });
    }
}

export const getTaskByIdService = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return json({ error: "Task not found" });
        }
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching task:", error);
        return json({ error: "Internal Server Error" });
    }
}

export const createTaskService = async (name, description, startDate, endDate, completed) => {
    try {
        const result = await pool.query(
            "INSERT INTO tasks (name, description, startDate, endDate, completed) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, description, startDate, endDate, completed]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error creating task:", error);
        return json({ error: "Internal Server Error" });
    }
}

export const updateTaskService = async (id, name, description, startDate, endDate, completed) => {
    try {
        const isTaskCompleted = completed === "true";
        const result = await pool.query(
            "UPDATE tasks SET name = $1, description = $2, startDate = $3, endDate = $4, completed = $5 WHERE id = $6 RETURNING *",
            [name, description, startDate, endDate, isTaskCompleted, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error updating task:", error);
        return json({ error: "Internal Server Error" });
    }
}

export const deleteTaskService = async (id) => {
    try {
        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *", [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting task:", error);
        return { error: "Internal Server Error" };
    }
}
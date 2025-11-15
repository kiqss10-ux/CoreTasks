import pool from "../config/db.js";   

const createTaskTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            startDate DATE,
            endDate DATE,
            completed BOOLEAN DEFAULT FALSE
        )
    `;

    try {
        await pool.query(query);
        console.log("Tasks table created successfully");
    } catch (error) {
        console.error("Error creating tasks table: ", error);
    }
} 

export default createTaskTable;
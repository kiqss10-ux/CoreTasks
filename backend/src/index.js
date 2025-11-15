import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from "./config/db.js";
import taskRoutes from './routes/taskRoutes.js';
import errorHandling from './middlewares/errorHandler.js';
import createTaskTable from './data/createTaskTable.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;


app.use(express.json());
app.use(cors());

app.use('/api', taskRoutes);

app.use(errorHandling);

createTaskTable();

//Testing PostgreSQL connection
app.get("/", async (req, res) => {
  console.log("Start");
  const result = await pool.query("SELECT current_database()");
  console.log("result", result.rows);
  res.send(`The database name is : ${result.rows[0].current_database}`);
});

//Server running
app.listen(port, () => {
  console.log(`Server is running on http:localhost:${port}`);
});

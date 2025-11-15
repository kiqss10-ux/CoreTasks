CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  completed BOOLEAN DEFAULT FALSE,
  );

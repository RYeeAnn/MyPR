const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const port = 3002; // You can use any port number you prefer

app.use(bodyParser.json());
app.use(cors());

// PostgreSQL database connection configuration
const client = new Client({
  user: 'ryan',
  host: 'localhost',
  database: 'mypr',
  password: '1231',
  port: 5432,
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Error connecting to PostgreSQL database:', err));

  app.post('/api/log-pr', async (req, res) => {
    const { exercise, weight, reps, sets, date, userId } = req.body;
    try {
      let query, values;
      if (weight) {
        query = 'INSERT INTO workouts (exercise, weight, reps, sets, date, user_id) VALUES ($1, $2, $3, $4, $5, $6)';
        values = [exercise, weight, reps, sets, date, userId];
      } else {
        query = 'INSERT INTO workouts (exercise, reps, sets, user_id) VALUES ($1, $2, $3, $4)';
        values = [exercise, reps, sets, userId];
      }
      await client.query(query, values);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error inserting PR data into PostgreSQL database:', error);
      res.sendStatus(500);
    }
  });
  
  
  app.get('/api/logs', async (req, res) => {
    const { userId } = req.query;
    try {
      const query = 'SELECT * FROM workouts WHERE user_id = $1';
      const result = await client.query(query, [userId]);
      const logs = result.rows;
      res.json(logs);
    } catch (error) {
      console.error('Error fetching logs from PostgreSQL database:', error);
      res.sendStatus(500);
    }
  });

  app.delete('/api/logs/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const query = 'DELETE FROM workouts WHERE id = $1';
      const values = [id];
      await client.query(query, values);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error deleting log from PostgreSQL database:', error);
      res.sendStatus(500);
    }
  });
  
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const { Client } = require('pg');

// Create a new PostgreSQL client instance
const client = new Client({
  user: 'ryan',
  host: 'localhost',
  database: 'MyPR',
  password: '1231',
  port: 5432,
});

// Connect to the PostgreSQL database
client.connect();

// Function to create the 'workouts' table
async function createTable() {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS workouts (
        id SERIAL PRIMARY KEY,
        exercise VARCHAR(255) NOT NULL,
        weight INTEGER
      )
    `);
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

// Function to insert sample data into the 'workouts' table
async function insertData() {
  try {
    await client.query(`
      INSERT INTO workouts (exercise, weight)
      VALUES
        ('Squats', 200),
        ('Bench Press', 150),
        ('Deadlifts', 250)
    `);
    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

// Function to retrieve data from the 'workouts' table
async function retrieveData() {
  try {
    const result = await client.query('SELECT * FROM workouts');
    console.log('Workouts:');
    for (const row of result.rows) {
      console.log(`${row.id}: ${row.exercise} - ${row.weight}`);
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
  } finally {
    client.end(); // Close the database connection
  }
}

// Call the functions to create table, insert data, and retrieve data
createTable()
  .then(insertData)
  .then(retrieveData)
  .catch(error => console.error('Error:', error));

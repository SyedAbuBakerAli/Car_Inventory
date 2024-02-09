const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000; // Choose the port you want to run the API on

// MySQL database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Abu3Abu3@',
  database: 'car_inventory'
};

// Create a MySQL pool to handle multiple connections
const pool = mysql.createPool(dbConfig);

// Define a simple API endpoint to get the list of items
app.get('/items', (req, res) => {
  // Use the pool to get a connection
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection: ' + err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Perform a simple query to select all items from the 'cars' table
    connection.query('SELECT * FROM cars', (queryErr, results) => {
      // Release the connection back to the pool
      connection.release();

      if (queryErr) {
        console.error('Error executing MySQL query: ' + queryErr.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      // Send the results as JSON
      res.json(results);
    });
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

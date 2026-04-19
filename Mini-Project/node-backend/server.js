const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const db = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',      // Replace with your MySQL username
  password: 'abishek',      // Replace with your MySQL password
  database: 'ewaste_db' // Updated to your existing database name
});

// Test connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ Connected to MySQL database');
    connection.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
})();

// ─── API ENDPOINTS ───────────────────────────────────────────────────────────

// GET: Fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// POST: Insert a new user
app.post('/api/users', async (req, res) => {
  const { name, email, role, status } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and Email are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO users (name, email, role, status, date) VALUES (?, ?, ?, ?, NOW())',
      [name, email, role || 'USER', status || 'ACTIVE']
    );
    res.status(201).json({
      message: 'User created successfully',
      id: result.insertId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to insert user', message: err.message });
  }
});

// DELETE: Remove a user by ID
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user', message: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`? Server running on http://localhost:${PORT}`);
});

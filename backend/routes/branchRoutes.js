const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all branches
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM branches');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get a single branch by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM branches WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new branch
router.post('/', async (req, res) => {
    try {
        const { name, location } = req.body;
        const result = await db.query('INSERT INTO branches (name, location) VALUES ($1, $2) RETURNING *', [name, location]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a branch
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location } = req.body;
        const result = await db.query('UPDATE branches SET name = $1, location = $2 WHERE id = $3 RETURNING *', [name, location, id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a branch
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM branches WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});


module.exports = router;

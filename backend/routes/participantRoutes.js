const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all participants
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM participants');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get a single participant by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM participants WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new participant
router.post('/', async (req, res) => {
    try {
        const { name, type, grade, branch_id } = req.body;
        const result = await db.query('INSERT INTO participants (name, type, grade, branch_id) VALUES ($1, $2, $3, $4) RETURNING *', [name, type, grade, branch_id]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a participant
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, grade, branch_id } = req.body;
        const result = await db.query('UPDATE participants SET name = $1, type = $2, grade = $3, branch_id = $4 WHERE id = $5 RETURNING *', [name, type, grade, branch_id, id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a participant
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM participants WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});


module.exports = router;

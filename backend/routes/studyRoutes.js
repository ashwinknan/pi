const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all studies
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM studies');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get a single study by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM studies WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new study
router.post('/', async (req, res) => {
    try {
        const { name, description, participant_type } = req.body;
        const result = await db.query('INSERT INTO studies (name, description, participant_type) VALUES ($1, $2, $3) RETURNING *', [name, description, participant_type]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a study
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, participant_type } = req.body;
        const result = await db.query('UPDATE studies SET name = $1, description = $2, participant_type = $3 WHERE id = $4 RETURNING *', [name, description, participant_type, id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a study
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM studies WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

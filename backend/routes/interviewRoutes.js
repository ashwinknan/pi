const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all interviews
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM interviews');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get a single interview by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM interviews WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new interview
router.post('/', async (req, res) => {
    try {
        const { date, recording_url, transcript, interviewer, participant_id, study_id } = req.body;
        const result = await db.query('INSERT INTO interviews (date, recording_url, transcript, interviewer, participant_id, study_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [date, recording_url, transcript, interviewer, participant_id, study_id]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update an interview
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { date, recording_url, transcript, interviewer, participant_id, study_id } = req.body;
        const result = await db.query('UPDATE interviews SET date = $1, recording_url = $2, transcript = $3, interviewer = $4, participant_id = $5, study_id = $6 WHERE id = $7 RETURNING *', [date, recording_url, transcript, interviewer, participant_id, study_id, id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete an interview
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM interviews WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

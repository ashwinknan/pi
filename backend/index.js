const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./db');

const branchRoutes = require('./routes/branchRoutes');
const participantRoutes = require('./routes/participantRoutes');
const studyRoutes = require('./routes/studyRoutes');
const interviewRoutes = require('./routes/interviewRoutes');


app.use(cors());
app.use(bodyParser.json());

// Existing routes
app.use('/branches', branchRoutes);
app.use('/participants', participantRoutes);
app.use('/studies', studyRoutes);
app.use('/interviews', interviewRoutes);

app.get('/', (req, res) => {
    res.send('UserInsights Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//Endpoint to test the database connection
app.get('/testdb', async (req, res) => {
    try {
      const result = await db.query('SELECT NOW()');
      res.json(result.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

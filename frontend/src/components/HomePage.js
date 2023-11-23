import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './HomePage.css';

// Component for individual study card
const StudyCard = ({ study }) => (
    <Card variant="outlined" className="study-card">
      <CardContent>
        <Typography variant="h5" component="h2">
          {study.name}
        </Typography>
        <Typography color="textSecondary">
          {study.description}
        </Typography>
      </CardContent>
    </Card>
  );
  

// HomePage component
const HomePage = () => {
  const [studies, setStudies] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    participant_type: '',
    created_at: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/studies')
      .then(response => setStudies(response.data))
      .catch(error => setError('Error fetching studies'));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/studies', formData)
      .then(response => {
        setStudies([...studies, response.data]);
        setFormData({
          name: '',
          description: '',
          participant_type: '',
          created_at: '',
        });
      })
      .catch(error => setError('Error creating study'));
  };

  return (
    <Container className="homepage">
      <Typography variant="h4" component="h1" gutterBottom>
        Studies
      </Typography>
      <Grid container spacing={2}>
        {studies.map(study => (
          <Grid item key={study.id} xs={12} sm={6} md={4}>
            <StudyCard study={study} />
          </Grid>
        ))}
      </Grid>
      <Box component="form" className="new-study-form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Study Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          variant="outlined"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Participant Type"
          name="participant_type"
          value={formData.participant_type}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type="date"
          name="created_at"
          value={formData.created_at}
          onChange={handleInputChange}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Create New Study
        </Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default HomePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import StudyCard from './StudyCard'; // Adjust the path as needed
import './HomePage.css';

const HomePage = () => {
  const [studies, setStudies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    participant_type: '',
    created_at: '',
  });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/studies')
      .then(response => setStudies(response.data))
      .catch(error => setError('Error fetching studies'));
  }, []);

  //const handleInputChange = (event) => {
    //const { name, value } = event.target;
    //setFormData({ ...formData, [name]: value });
  //};

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/studies', formData)
      .then(response => {
        setStudies(prevStudies => [...prevStudies, response.data]);
        setShowForm(false);
        setFormData({
          name: '',
          description: '',
          participant_type: '',
          created_at: '',
        });
        setError(''); // Clear any errors
      })
      .catch(error => {
        setError('Error creating study');
      });
  };

  const handleDeleteConfirm = (studyId) => {
    axios.delete(`http://localhost:3001/studies/${studyId}`)
      .then(() => {
        setStudies(studies.filter(study => study.id !== studyId));
        setOpenSnackbar(true);
        setError(''); // Clear any errors
      })
      .catch(error => {
        setError('Error deleting study');
      });
  };

  return (
    <Container className="homepage">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome!
      </Typography>
      {!showForm && (
        <Button variant="contained" onClick={() => setShowForm(true)} sx={{ mb: 2 }}>
          Create New Study
        </Button>
      )}
      {!showForm ? (
        <Grid container spacing={2}>
          {studies.map(study => (
            <Grid item key={study.id} xs={12} sm={6} md={4}>
              <StudyCard study={study} onDeleteConfirm={handleDeleteConfirm} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box component="form" className="new-study-form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* ... form fields ... */}
        </Box>
      )}
      {error && <Typography color="error">{error}</Typography>}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Study deleted successfully"
      />
    </Container>
  );
};

export default HomePage;

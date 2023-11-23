import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// Add other MUI components as necessary

const InterviewsPage = () => {
  const [interviews, setInterviews] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { studyId } = useParams();
  const { state } = useLocation();
  const study = state.study; // Or fetch study details using studyId

  useEffect(() => {
    // Fetch interviews for the study
    axios.get(`/api/interviews/${studyId}`)
      .then(response => setInterviews(response.data))
      .catch(err => setError('Error fetching interviews'));
  }, [studyId]);

  const handleAddInterviewClick = () => {
    navigate(`/add-interview/${studyId}`);
  };

  // Add functions for handling view and delete actions for interviews here

  return (
    <Container>
      <Typography variant="h4">{study.name}</Typography>
      <Typography variant="subtitle1">{study.description}</Typography>
      <Typography variant="subtitle2">{new Date(study.created_at).toLocaleDateString()}</Typography>
      <Button variant="contained" onClick={handleAddInterviewClick}>
        Add Interview
      </Button>
      {/* Render the table of interviews here */}
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default InterviewsPage;

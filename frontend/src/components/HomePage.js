import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css'; // Your CSS file for styles

// Component for individual study card
const StudyCard = ({ study }) => (
  <div className="study-card">
    <h3>{study.name}</h3>
    <p>{study.description}</p>
  </div>
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
    <div className="homepage">
      <h1>Studies</h1>
      <div className="study-cards-container">
        {studies.map(study => <StudyCard key={study.id} study={study} />)}
      </div>
      <form className="new-study-form" onSubmit={handleSubmit}>
        {/* Form fields here */}
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        <textarea name="description" value={formData.description} onChange={handleInputChange} required />
        <input type="text" name="participant_type" value={formData.participant_type} onChange={handleInputChange} required />
        <input type="date" name="created_at" value={formData.created_at} onChange={handleInputChange} required />
        <button type="submit">Create New Study</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default HomePage;

import React, { useState } from 'react';
import axios from 'axios';
import ConfigurationForm from './components/ConfigurationForm';
import WebsiteCard from './components/WebsiteCard';
import TestBackendIntegration from './components/TestBackendIntegration';


function App() {
  const [configurations, setConfigurations] = useState([]);

  const handleFormSubmit = (formData) => {
    axios.post('http://127.0.0.1:8000/api/pages/', formData)
      .then(response => {
        setConfigurations([...configurations, response.data]);
      })
      .catch(error => {
        console.error("There was an error creating the page!", error);
      });
  };

  return (
    <div style={styles.container}>
      <h1>Website Generator</h1>
      <ConfigurationForm onSubmit={handleFormSubmit} />
      <div style={styles.cards}>
        {configurations.map((config, index) => (
          <WebsiteCard
            key={index}
            title={config.title}
            description={config.description}
          />
        ))}
      <TestBackendIntegration />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
  },
  cards: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '2rem',
  },
};

export default App;
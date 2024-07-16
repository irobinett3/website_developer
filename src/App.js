// src/App.js
import React from 'react';
import ConfigurationForm from './components/ConfigurationForm';
import WebsiteCard from './components/WebsiteCard';

function App() {
  const [configurations, setConfigurations] = React.useState([]);

  const handleFormSubmit = (formData) => {
    // Send the formData to your backend to process and generate the website
    // For now, we'll just add it to a list to display it
    setConfigurations([...configurations, formData]);
  };

  return (
    <div style={styles.container}>
      <h1>Website Generator</h1>
      <ConfigurationForm onSubmit={handleFormSubmit} />
      <div style={styles.cards}>
        {configurations.map((config, index) => (
          <WebsiteCard
            key={index}
            title={config.websiteName}
            description={config.description}
          />
        ))}
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
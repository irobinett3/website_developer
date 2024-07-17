import React, { useState } from 'react';

const TestBackendIntegration = () => {
  const [response, setResponse] = useState(null);

  const testBackend = () => {
    fetch('http://localhost:8000/api/test/')
      .then(response => response.json())
      .then(data => setResponse(data.message))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <button onClick={testBackend}>Test Backend</button>
      {response && <p>{response}</p>}
    </div>
  );
};

export default TestBackendIntegration;
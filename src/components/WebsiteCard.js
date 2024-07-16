// src/components/WebsiteCard.js
import React, { useState } from 'react';
import styles from './WebsiteCard.module.css';

const WebsiteCard = ({ title, description }) => {
  const [showDescription, setShowDescription] = useState(true);

  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      {showDescription && <p>{description}</p>}
      <button onClick={() => setShowDescription(!showDescription)}>
        {showDescription ? 'Hide' : 'Show'} Description
      </button>
    </div>
  );
};

export default WebsiteCard;
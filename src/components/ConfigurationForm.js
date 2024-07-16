// src/components/ConfigurationForm.js
import React, { useState } from 'react';

const ConfigurationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    websiteName: '',
    description: '',
    colorScheme: '',
    layout: '',
    features: {
      blog: false,
      eCommerce: false,
      portfolio: false,
    },
    pages: [{ title: '', description: '' }],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        features: {
          ...formData.features,
          [name]: checked,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePageChange = (index, e) => {
    const { name, value } = e.target;
    const newPages = [...formData.pages];
    newPages[index][name] = value;
    setFormData({ ...formData, pages: newPages });
  };

  const addPage = () => {
    setFormData({ ...formData, pages: [...formData.pages, { title: '', description: '' }] });
  };

  const removePage = (index) => {
    const newPages = formData.pages.filter((_, i) => i !== index);
    setFormData({ ...formData, pages: newPages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div>
        <label>Website Name:</label>
        <input type="text" name="websiteName" value={formData.websiteName} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Color Scheme:</label>
        <input type="text" name="colorScheme" value={formData.colorScheme} onChange={handleChange} />
      </div>
      <div>
        <label>Layout:</label>
        <input type="text" name="layout" value={formData.layout} onChange={handleChange} />
      </div>
      <div>
        <label>Features:</label>
        <div>
          <label>
            <input type="checkbox" name="blog" checked={formData.features.blog} onChange={handleChange} />
            Blog
          </label>
          <label>
            <input type="checkbox" name="eCommerce" checked={formData.features.eCommerce} onChange={handleChange} />
            eCommerce
          </label>
          <label>
            <input type="checkbox" name="portfolio" checked={formData.features.portfolio} onChange={handleChange} />
            Portfolio
          </label>
        </div>
      </div>
      <div>
        <label>Pages:</label>
        {formData.pages.map((page, index) => (
          <div key={index} style={styles.pageContainer}>
            <div>
              <label>Page Title:</label>
              <input
                type="text"
                name="title"
                value={page.title}
                onChange={(e) => handlePageChange(index, e)}
                required
              />
            </div>
            <div>
              <label>Page Description:</label>
              <textarea
                name="description"
                value={page.description}
                onChange={(e) => handlePageChange(index, e)}
                required
              />
            </div>
            <button type="button" onClick={() => removePage(index)} style={styles.removeButton}>
              - Remove Page
            </button>
          </div>
        ))}
        <button type="button" onClick={addPage} style={styles.addButton}>
          + Add Page
        </button>
      </div>
      <button type="submit">Generate Website</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  pageContainer: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px 0',
    position: 'relative',
  },
  addButton: {
    margin: '8px 0',
  },
  removeButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ConfigurationForm;
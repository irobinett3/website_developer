import React, { useState } from 'react';
import { getCookie } from './utils';
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
    pages: [{ title: '', description: '', images: [] }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePageChange = (index, e) => {
    const { name, value, files } = e.target;
    const newPages = [...formData.pages];

    if (files) {
      newPages[index][name] = Array.from(files);
    } else {
      newPages[index][name] = value;
    }

    setFormData({ ...formData, pages: newPages });
  };

  const addPage = () => {
    setFormData({ ...formData, pages: [...formData.pages, { title: '', description: '', images: [] }] });
  };

  const removePage = (index) => {
    const newPages = formData.pages.filter((_, i) => i !== index);
    setFormData({ ...formData, pages: newPages });
  };

  const handleImageChange = (pageIndex, imageIndex, e) => {
    const files = Array.from(e.target.files);
    const newPages = [...formData.pages];
    newPages[pageIndex].images[imageIndex] = files[0];
    setFormData({ ...formData, pages: newPages });
  };

  const addImageField = (pageIndex) => {
    const newPages = [...formData.pages];
    newPages[pageIndex].images.push('');
    setFormData({ ...formData, pages: newPages });
  };

  const removeImageField = (pageIndex, imageIndex) => {
    const newPages = [...formData.pages];
    newPages[pageIndex].images = newPages[pageIndex].images.filter((_, i) => i !== imageIndex);
    setFormData({ ...formData, pages: newPages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData();

    const csrftoken = getCookie('csrftoken');


    fetch('http://localhost:8000/api/upload/', {
      method: 'POST',
      body: formDataObj,
      headers: {
        'X-CSRFToken': csrftoken,
      },
      credentials: 'include', // Include credentials such as cookies
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    // Add text fields to FormData
    formDataObj.append('websiteName', formData.websiteName);
    formDataObj.append('description', formData.description);
    formDataObj.append('colorScheme', formData.colorScheme);
    formDataObj.append('layout', formData.layout);

    // Add features to FormData
    for (let key in formData.features) {
      formDataObj.append(`features[${key}]`, formData.features[key]);
    }

    // Add pages to FormData
    formData.pages.forEach((page, index) => {
      formDataObj.append(`pages[${index}][title]`, page.title);
      formDataObj.append(`pages[${index}][description]`, page.description);
      page.images.forEach((image, imgIndex) => {
        formDataObj.append(`pages[${index}][images][${imgIndex}]`, image);
      });
    });

    // Send FormData to backend
    fetch('http://localhost:8000/api/upload', {
      method: 'POST',
      body: formDataObj,
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response data
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
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
      {formData.pages.map((page, pageIndex) => (
        <div key={pageIndex} style={styles.pageContainer}>
          <div>
            <label>Page Title:</label>
            <input
              type="text"
              name="title"
              value={page.title}
              onChange={(e) => handlePageChange(pageIndex, e)}
              required
            />
          </div>
          <div>
            <label>Page Description:</label>
            <textarea
              name="description"
              value={page.description}
              onChange={(e) => handlePageChange(pageIndex, e)}
              required
            />
          </div>
          <div>
            <label>Upload Images:</label>
            {page.images.map((image, imageIndex) => (
              <div key={imageIndex} style={styles.imageFieldContainer}>
                <input type="file" onChange={(e) => handleImageChange(pageIndex, imageIndex, e)} />
                <button type="button" onClick={() => removeImageField(pageIndex, imageIndex)} style={styles.removeImageButton}>
                  - Remove Image
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addImageField(pageIndex)} style={styles.addButton}>
              + Add Image
            </button>
          </div>
          <button type="button" onClick={() => removePage(pageIndex)} style={styles.removeButton}>
            - Remove Page
          </button>
        </div>
      ))}
      <button type="button" onClick={addPage} style={styles.addButton}>
        + Add Page
      </button>
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
  imageFieldContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '8px 0',
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
  removeImageButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ConfigurationForm;
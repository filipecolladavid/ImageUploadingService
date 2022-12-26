import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';

import ImageCard from './ImageCard';

import { baseUrl } from './App';

function ImageList({ handleSelect }) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchImages = () => {
      fetch(baseUrl + 'images')
        .then(response => response.json())
        .then(data => {
          if (!cancelled) {
            setImages(data);
          }
        })
        .catch(error => {
          if (!cancelled) {
            setError(error);
          }
        })
        .finally(() => {
          if (!cancelled) {
            setLoading(false);
          }
        });
    };
    fetchImages();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <Row xs={1} md={4} className="g-4">{images.map((image) => (
      <ImageCard key={image._id} image={image} handleSelect={handleSelect} />
    ))}
    </Row>
  );
}

export default ImageList;

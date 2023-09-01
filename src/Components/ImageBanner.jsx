// src/components/ImageBanner.js
import React, { useState, useEffect } from 'react';
import './ImageBanner.css';
import { Box } from '@mui/material';
import banner from '../images/bannerunsxx.jpg';
import Fondo3 from '../images/fondo3.jpg';

const ImageBanner = ({ images, interval }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % images.length
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className="banner">
  <img src={banner} alt="Banner" />
  <div className="banner-content">
      <h1>aGuideHub</h1>
      <p>Welcome To aGuideHub! </p>
  </div>
</div>
  );
};

export default ImageBanner;
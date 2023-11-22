// src/components/ImageBanner.js
import React, { useState, useEffect } from 'react';
import './ImageBanner.css';
import banner from '../images/bannerunsxx.jpg';

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
  </div>
</div>
  );
};

export default ImageBanner;
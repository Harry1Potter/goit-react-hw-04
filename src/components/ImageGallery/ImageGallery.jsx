import React from 'react';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ images = [], onImageClick }) => {
  if (images.length === 0) {
    return <p>No images found. Try a different search.</p>;
  }

  return (
    <ul>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard
            src={image.urls.small}
            alt={image.alt_description}
            onClick={() => onImageClick(image)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;

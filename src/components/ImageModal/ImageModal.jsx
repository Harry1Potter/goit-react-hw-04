import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          padding: '0',
          border: 'none',
          borderRadius: '4px',
          background: 'transparent',
          overflow: 'hidden',
        },
      }}
    >
      <button onClick={onRequestClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>
        Close
      </button>
      {image && (
        <img src={image.urls.full} alt={image.alt_description} style={{ width: '100%' }} />
      )}
    </Modal>
  );
};

export default ImageModal;
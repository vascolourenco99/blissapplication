import React, { useState } from 'react';
import './ShareModal.css';

const ShareModal = ({ isOpen, onClose }) => {
  const [destinationEmail, setDestinationEmail] = useState('');

  const handleSubmit = async (e) => {

    const response = await fetch(`https://private-anon-2c8b79ecec-blissrecruitmentapi.apiary-mock.com/share?destination_email=${destinationEmail}&content_url=${window.location.href}`, {
      method: 'POST'
    });

    if (response.ok) {
      // success
      alert('Content shared successfully!');
    } else {
      // error
      alert('Error sharing content!');
    }

    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Share Link</h2>
        <form onSubmit={handleSubmit}>
          <p>Enter the destination email:</p>
          <div className="modal-input">
            <input type="email" className="share-modal-input" value={destinationEmail} onChange={(e) => setDestinationEmail(e.target.value)} required />
            <button type="submit" className="modal-button">Share</button>
          </div>
        </form>
        <p>Or copy the link below:</p>
        <div className="modal-input">
          <input type="text" className="share-modal-input" value={window.location.href} readOnly />
          <button className="modal-button" onClick={() => navigator.clipboard.writeText(window.location.href)}>Copy Link</button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
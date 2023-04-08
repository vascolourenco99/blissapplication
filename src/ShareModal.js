import React from 'react';
import './ShareModal.css';

const ShareModal = ({ isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Share Link</h2>
        <p>Copy the link below:</p>
        <input type="text" value={window.location.href} readOnly />
        <button onClick={() => {navigator.clipboard.writeText(window.location.href)}}>Copy Link</button>
      </div>
    </div>
  );
};

export default ShareModal;
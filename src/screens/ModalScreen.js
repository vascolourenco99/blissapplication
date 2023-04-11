import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

function ModalScreen({ isOpen, onClose, handleSubmit, destinationEmail, setDestinationEmail }) {
  
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-button-copy-link" onClick={() => navigator.clipboard.writeText(window.location.href)}>
          <FontAwesomeIcon icon={faLink} className="modal-button-link-icon" />
          Copy Link
        </button>
        <h2 className="modal-title">Share Link</h2>
        <form onSubmit={handleSubmit}>
          <p className="modal-p">Enter the destination email:</p>
          <div className="modal-input">
            <input type="email" className="share-modal-input" value={destinationEmail} onChange={(e) => setDestinationEmail(e.target.value)} required />
            <button type="submit" className="modal-button-share">Share</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalScreen;






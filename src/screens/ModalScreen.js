import React from 'react';

function ModalScreen({ isOpen, onClose, handleSubmit, destinationEmail, setDestinationEmail }) {
  return (
    <>
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
    </>
  );
}

export default ModalScreen;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShare } from '@fortawesome/free-solid-svg-icons';


const Header = ({ handleShare }) => {
  return (
      <div className="question-header">
        <FontAwesomeIcon className="question-back-button" icon={faArrowLeft} onClick={() => window.history.back()}/>
        <button className="question-share-button" onClick={handleShare}>
          <FontAwesomeIcon icon={faShare} className="question-share-button-icon"/>
          Share
        </button>
      </div>
  );
}

export default Header;
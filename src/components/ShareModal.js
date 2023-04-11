import React, { useState } from 'react';
import './ShareModal.css';
import ModalScreen from '../screens/ModalScreen';


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
    <ModalScreen
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      destinationEmail={destinationEmail}
      setDestinationEmail={setDestinationEmail}
    />
  );
};

export default ShareModal;
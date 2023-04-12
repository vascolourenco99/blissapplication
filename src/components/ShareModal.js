import React, { useState } from 'react';
import './ShareModal.css';
import ModalScreen from '../screens/ModalScreen';
import { shareQuestion } from '../api';

const ShareModal = ({ isOpen, onClose }) => {
  const [destinationEmail, setDestinationEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = await shareQuestion(destinationEmail);
      console.log(data)
      if (data.ok) {
        alert('Content shared successfully!');
      } else {
        alert('Error sharing content!');
      }
    } catch (error) {
      console.error('Error sharing content:', error);
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
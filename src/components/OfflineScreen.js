import React from 'react';
import './OfflineScreen.css'
import { handleRetry } from '../api/';

const OfflineScreen = () => {
  return (
    <div>
      <h2>You are currently offline. Please check your internet connection.</h2>
      <button className='button-retry' onClick={handleRetry}>Retry</button>
    </div>
  );
};

export default OfflineScreen;
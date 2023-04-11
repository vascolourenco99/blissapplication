import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import './App.css';
import { QUESTIONS_URL, QUESTIONS_LIMIT } from './resources/constants';
import {Routes ,Route, useNavigate } from 'react-router-dom';
import QuestionDetails from './components/QuestionDetails';
import QuestionsList from './components/QuestionsList';
import OfflineScreen from './components/OfflineScreen';
import { getHealth, handleRetry } from './api';

// Main component
function App() {
  const navigate = useNavigate();
  
  // State variables
  const [loading, setLoading] = useState(true);
  const [healthStatus, setHealthStatus] = useState(null);
  const [filter] = useState('');
  const [questions, setQuestions] = useState([]);

  // Effect hook to fetch health status from server
  useEffect(() => {
    async function fetchHealth() { 
    const data = await getHealth();
    setHealthStatus(data.status);
    }
    fetchHealth();
  }
  , []);

  // Effect hook to fetch questions data from server
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const params = new URLSearchParams(window.location.search);
        const filterParam = params.get('filter') || '';
        const response = await fetch(`${QUESTIONS_URL}?limit=${QUESTIONS_LIMIT}&offset=0&filter=${filterParam}`);
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [filter]);

  // Event handler for clicking on a question
  const handleQuestionClick = async (id) => {
    const url = `/questions/${id}/`;
    navigate(url);
  };

  // Render main component with questions list and search bar if health status is OK
  return (
    <div className="App">
      {!healthStatus ? (
       <div className="loader-container">
          <Loader loading={loading} />
        </div>
       ) :
      healthStatus === 'OK' ? (
        <>
          <Routes>
            <Route path="/" element={<QuestionsList questions={questions} handleQuestionClick={handleQuestionClick} setQuestions={setQuestions} />} />
            <Route path="/questions/:id/" element={<QuestionDetails/>} />
          </Routes>  
        </>
      ) : (
        <>
          <OfflineScreen />
          <button onClick={handleRetry}>Retry</button>
        </>
      )}
    </div>
  );
}

export default App;

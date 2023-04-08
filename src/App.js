import { useState, useEffect } from 'react';
import Loader from './Loader';
import './App.css';
import { QUESTIONS_URL, HEALTH_URL, QUESTIONS_LIMIT, QUESTIONS_OFFSET } from './constants';
import {Routes ,Route, useNavigate } from 'react-router-dom';
import QuestionDetails from './QuestionDetails';
import QuestionList from './QuestionList';

// Main component
function App() {
  // State variables
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [healthStatus, setHealthStatus] = useState(null);
  const [filter] = useState('');
  const [questions, setQuestions] = useState([]);

  // Effect hook to fetch health status from server
  useEffect(() => {
    async function fetchHealth() {
      try {
        const response = await fetch(HEALTH_URL);
        const data = await response.json();
        setHealthStatus(data.status);
      } catch (error) {
        console.error('Error fetching health status:', error);
      }
    }

    fetchHealth();
  }, []);

  // Effect hook to fetch questions data from server
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const params = new URLSearchParams(window.location.search);
        const filterParam = params.get('filter') || '';
        const response = await fetch(`${QUESTIONS_URL}?limit=${QUESTIONS_LIMIT}&offset=${QUESTIONS_OFFSET}&filter=${filterParam}`);
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
        {healthStatus === 'OK' ? (
          <>
            <div className="loader-container">
              <Loader loading={loading} />
            </div>
            <Routes>
            <Route path="/" element={<QuestionList questions={questions} handleQuestionClick={handleQuestionClick} setQuestions={setQuestions} />} />
            <Route path="/questions/:id/" element={<QuestionDetails/>} />
          </Routes>  
          </>
        ) : (
          <>
            <div className="loader-container">
              <Loader loading={loading} />
            </div>
            <div className="App">
              <h1>Oh Nooo! Try Again</h1>
              <button className='search-button' onClick={() => window.location.reload()}>
                Reload
              </button>
            </div>
          </>
        )}
      </div>
    
  );
}

export default App;

import { useState } from 'react';
import './App';
import { QUESTIONS_URL, QUESTIONS_LIMIT, QUESTIONS_OFFSET } from './constants';
import Loader from './Loader';

// QuestionList component
function QuestionList({ questions, handleQuestionClick, setQuestions }) {
  const [filter, setFilter] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`${QUESTIONS_URL}?limit=${QUESTIONS_LIMIT}&offset=${QUESTIONS_OFFSET}&filter=${filter}`);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleDismiss = () => {
    setFilter('');
  };

  return (
    <>
      <h1>List Screen</h1>
      <h3> Search for question! </h3>
      <input className='App' type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <div className='buttons'>
        <button className='search-button' onClick={handleSearch}>Search</button>
        <button className="dismiss-button" onClick={handleDismiss}>Dismiss</button>
      </div>
      <ul className="question-list">
      {questions.map((question) => (
  <li key={question.id} className="question-card" onClick={() => handleQuestionClick(question.id)}>
    <div>
      <img src={question.thumb_url} alt={question.question} />
      <h3>{question.question}</h3>
    </div>
  </li>
))}
      </ul>
    </>
  );
}

export default QuestionList;
import { useState } from 'react';
import './QuestionsList.css';
import { QUESTIONS_URL, QUESTIONS_LIMIT, QUESTIONS_OFFSET } from '../resources/constants';
import Loader from './Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

// QuestionList component
function QuestionList({ questions, handleQuestionClick, setQuestions }) {
  const [filter, setFilter] = useState('');
  const [offset, setOffset] = useState(QUESTIONS_OFFSET);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${QUESTIONS_URL}?limit=${QUESTIONS_LIMIT}&offset=${offset}&filter=${filter}`);
      const data = await response.json();
      setQuestions([...questions, ...data]);
      setOffset(offset + QUESTIONS_LIMIT);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setFilter('');
  };

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight) {
      handleSearch();
    }
  };

  function handleKeyPress(event) {
    console.log(event.key)
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <>
      <h1>List Screen</h1>
      <h3> Search for question! </h3>
      <div className='search-container'>
        <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
        <div className='icon-container-search'>
          <FontAwesomeIcon icon={faSearch} className='search-icon' onClick={handleSearch} onSubmit={handleKeyPress} />
        </div>
        <div className='icon-container-dismiss'> 
          <FontAwesomeIcon icon={faTimes} className='dismiss-icon' onClick={handleDismiss} />
        </div>
      </div>  
      <ul className="question-list" onScroll={handleScroll}>
        {questions.map((question) => (
        <li key={question.id} className="question-card" onClick={() => handleQuestionClick(question.id)}>
          <div>
            <img src={question.thumb_url} alt={question.question} />
            <h3>{question.question}</h3>
          </div>
        </li>
      ))}
      </ul>
      {loading && (
        <div className="loader-container">
          <Loader loading={loading} />
        </div>
      )}
    </>
  );
}

export default QuestionList;
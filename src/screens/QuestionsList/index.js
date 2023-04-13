import { useCallback, useEffect, useState } from 'react';
import './QuestionsList.css';

import Loader from '../../components/Loader';
import { getQuestions, QUESTIONS_LIMIT } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

// QuestionList component
const QuestionList = ({ questions, handleQuestionClick, setQuestions }) => {
  const [filter, setFilter] = useState('');
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  

  const handleSearch = useCallback( async (isNewSearch = false) => {
    try {
      setLoading(true);

      const data = await getQuestions(filter, offset)

      if (offset && !isNewSearch) {
        setQuestions([...questions, ...data]); 
        if (data.length < QUESTIONS_LIMIT) {
          setOffset(data.length + offset)
        } else {
          setOffset(offset + QUESTIONS_LIMIT)
        }

      } else {
        setQuestions(data)
        setOffset(0 + QUESTIONS_LIMIT);

      }

    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  }, [filter, offset, questions, setQuestions]);


  
  useEffect(() => {
    handleSearch(true);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const handleDismiss = () => {
    setFilter('');
  };

  return (
    <>
      <h1 className='main-title'>List Screen</h1>
      <h6 className='subtitle'> Search for question! </h6>
      <div className='search-container'>
        <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
        <div className='icon-container-search'>
          <FontAwesomeIcon icon={faSearch} className='search-icon' onClick={handleSearch} />
        </div>
        <div className='icon-container-dismiss'>
          <FontAwesomeIcon icon={faTimes} className='dismiss-icon' onClick={handleDismiss} />
        </div>
      </div>
      <ul className="question-list">
        {questions.map((question) => (
        <li key={question.id} className="question-card" onClick={() => handleQuestionClick(question.id)}>
          <div>
            <img src={question.thumb_url} alt={question.question} />
            <h4>{question.question}</h4>
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
import { useCallback, useEffect, useState } from 'react';
import './QuestionsList.css';
import { QUESTIONS_URL, QUESTIONS_LIMIT } from '../resources/constants';
import Loader from './Loader';
import AllQuestion from '../screens/AllQuestions';

// QuestionList component
function QuestionList({ questions, handleQuestionClick, setQuestions }) {
  const [filter, setFilter] = useState('');
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  

  const handleSearch = useCallback( async () => {
    try {
      setLoading(true);

      let url = `${QUESTIONS_URL}?limit=${QUESTIONS_LIMIT}&offset=${offset}`

      if (filter?.length) {
        url = url + `&filter=${filter}`
      }

      const response = await fetch(url);
      const data = await response.json();

      // repensar na logica do offset
      if (offset) {
        setQuestions([...questions, ...data]); 
        if (data.length < QUESTIONS_LIMIT) {
          setOffset(data.length + offset)
        } else {
          setOffset(offset + QUESTIONS_LIMIT)
        }

      } else {
        setQuestions(data)
        setOffset(0 + QUESTIONS_LIMIT);
        console.log(data)

      }

    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  }, [filter, offset, questions, setQuestions]);


  
  useEffect(() => {
    handleSearch();
  }, [filter])

  const handleDismiss = () => {
    setFilter('');
  };

  return (
    <>
      <AllQuestion
        filter={filter}
        setFilter={setFilter}
        handleSearch={handleSearch}
        handleDismiss={handleDismiss}
        questions={questions}
        handleQuestionClick={handleQuestionClick}
      />
      {loading && (
        <div className="loader-container">
          <Loader loading={loading} />
        </div>
      )}
    </>
  );
}

export default QuestionList;
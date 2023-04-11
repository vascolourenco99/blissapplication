import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';


function AllQuestion({ filter, setFilter, handleSearch, handleDismiss, questions, handleQuestionClick}) {
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
    </>
  );
}

export default AllQuestion;
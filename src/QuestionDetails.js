import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import './QuestionDetail.css'
import './App.css';

function QuestionDetails() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChoice, setSelectedChoice] = useState(null);
  useEffect(() => {
    async function fetchQuestion() {
      try {
        const url = `https://private-anon-9c8cf81161-blissrecruitmentapi.apiary-mock.com/questions/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        setQuestion(data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching question with id ${id}:`, error);
        setLoading(false);
      }
    }

    fetchQuestion();
  }, [id]);

  const handleChoiceClick = (choiceUrl) => {
    setSelectedChoice(choiceUrl);
  };

  const handleVote = async () => {
    try {
      const url = `https://private-anon-9c8cf81161-blissrecruitmentapi.apiary-mock.com/questions/${id}/choices/${selectedChoice}/vote`;
      const response = await fetch(url, { method: 'POST' });
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error(`Error voting on question with id ${id} and choice ${selectedChoice}:`, error);
    }
  };

  /* This method needs to be update if this APP goes to production */
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/questions/${id}`;
    console.log(`${window.location.origin}/questions/${id}`)
    if (navigator.share) {
      navigator.share({
        title: question.question,
        url: shareUrl
      })
        .catch(console.error);
    } else {
      alert(`Share this URL: ${shareUrl}`);
    }
  };

  return (
    <div className="question-container">
      {question ? (
        <>
          <h1 className="question-title">{question.question}</h1>
          <img className="question-image" src={question.image_url} alt={question.question} />
          <ul className="choices-list">
            {question.choices.map((choice) => (
              <li key={choice.url} className="choice-item">
                <button
                  className={`choice-button ${selectedChoice === choice.url ? 'selected' : ''}`}
                  onClick={() => handleChoiceClick(choice.url)}
                >
                  {`${choice.choice}: ${choice.votes} votes`}
                </button>
              </li>
            ))}
          </ul>
          <div className='buttons'>
            <button className="search-button" onClick={() => window.history.back()}>
              Back
            </button>
            <button className="search-button" onClick={handleVote} disabled={selectedChoice}>
              Vote
            </button>
            <button className="search-button" onClick={handleShare}>
            Share
          </button>
          </div>
        </>
      ) : (
        <div className="loader-container">
          <Loader loading={loading} />
        </div>
      )}
    </div>
  );
}

export default QuestionDetails;
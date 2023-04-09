import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import './QuestionDetails.css'
import '../App.css';
import ShareModal from './ShareModal';
import { faTimes, faSearch, faArrowLeft, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function QuestionDetails() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChoiceVotes, setSelectedChoiceVotes] = useState(null)


  useEffect(() => {
    async function fetchQuestion() {
      try {
        const url = `https://private-anon-9c8cf81161-blissrecruitmentapi.apiary-mock.com/questions/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setQuestion(data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching question with id ${id}:`, error);
        setLoading(false);
      }
    }

    fetchQuestion();
  }, [id]);

  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice.choice);
    setSelectedChoiceVotes(choice.votes);
  };

  const handleVote = async () => {
    if (!selectedChoice) {
      return;
    }

    if (!question.choices) {
      console.error("Question choices not defined");
      return;
    }

    const updatedChoices = question.choices.map((choice) => {
      if (choice.choice === selectedChoice) {
        return {
          ...choice,
          votes: choice.votes + 1,
        };
      }
      return choice;
    });

    const updatedQuestion = {
      ...question,
      choices: updatedChoices,
    };

    /* console.log("Os votos atualizados")
    console.log(updatedChoices) */

    try {
      fetch(
        `https://private-anon-2c8b79ecec-blissrecruitmentapi.apiary-mock.com/questions/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({updatedQuestion}),
        }
      );
      //console.log(updatedQuestion)
      setQuestion(updatedQuestion)
    } catch (error) {
      console.error(`Error updating question with id ${id}:`, error);
    }
  };

  const handleShare = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="question-fullscreen">
      <FontAwesomeIcon className="question-back-button" icon={faArrowLeft} onClick={() => window.history.back()}/>
      <button className="question-share-button" onClick={handleShare}>
        <FontAwesomeIcon icon={faShare} className="question-share-button-icon"/>
        Share
      </button>
      <ShareModal isOpen={isModalOpen} onClose={handleModalClose} />
      <div className="question-container">
      {question ? (
        <>
          <h1 className="question-title">{question.question}</h1>
          <div className="question-details">
            <img className="question-image" src={question.image_url} alt={question.question} />
            <ul className="choices-list">
              {question.choices.map((choice) => (
                <li key={choice.url} className="choice-item">
                  <button
                    className={`choice-button ${selectedChoice === choice.choice ? "selected" : ""}`}
                    onClick={() => handleChoiceClick(choice)}
                  >
                    {`${choice.choice}: ${choice.votes} votes`}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button className="question-vote-button" onClick={handleVote} disabled={!selectedChoice}>
            Vote
          </button>
        </>
      ) : (
        <div className="loader-container">
          <Loader loading={loading} />
        </div>
      )}
      </div>
    </div>
  );
}

export default QuestionDetails;
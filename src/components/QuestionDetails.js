import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import './QuestionDetails.css'
import '../App.css';
import ShareModal from './ShareModal';
import { faArrowLeft, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {getQuestion, putQuestionVote} from '../api'

function QuestionDetails() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [selectedChoiceVotes, setSelectedChoiceVotes] = useState(null)


  const fetchQuestion = useCallback( async () => {
    try {
      const data =  await getQuestion(id)
      //console.log(data);
      setQuestion(data);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching question with id ${id}:`, error);
      setLoading(false);
    }
  }, [id])

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice.choice);
    //setSelectedChoiceVotes(choice.votes);
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
      await putQuestionVote(id, updatedQuestion) 
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
      <div className="question-header">
        <FontAwesomeIcon className="question-back-button" icon={faArrowLeft} onClick={() => window.history.back()}/>
        <button className="question-share-button" onClick={handleShare}>
          <FontAwesomeIcon icon={faShare} className="question-share-button-icon"/>
          Share
        </button>
      </div>
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
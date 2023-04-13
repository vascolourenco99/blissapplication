import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import './QuestionDetails.css'
import '../../App.css';
import ShareModal from '../../components/ShareModal';
import {getQuestion, putQuestionVote} from '../../api'
import Header from '../../components/Header';



const QuestionDetails = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const fetchQuestion = useCallback( async () => {
    try {
      const data =  await getQuestion(id)
      setQuestion(data);
      

    } catch (error) {
      console.error(`Error fetching question with id ${id}:`, error);
      
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice.choice);
  };

  const handleVote = async () => {
    if (!selectedChoice) {
      return;
    }

    if (!question.choices) {
      console.error("Question choices not defined");
      return;
    }

    const updatedChoices = question.choices.map((question) => {
      if (question.choice === selectedChoice) {
        return {
          ...question,
          votes: question.votes + 1,
        };
      }
      return question;
    });

    const updatedQuestion = {
      ...question,
      choices: updatedChoices,
    };

    try {
      await putQuestionVote(id, updatedQuestion)
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
      <Header
      handleShare={handleShare}
      />
      <ShareModal isOpen={isModalOpen} onClose={handleModalClose} />
      <div className="question-container">
        {question ? (
            <>
            <h1 className="question-title">{question.question}</h1>
            <div className="question-details">
              <img className="question-image" src={question.image_url} alt={question.question} />
              <ul className="choices-list">
                {question.choices.map(({choice, votes}) => (
                  <li key={`row-${choice}`} className="choice-item">
                    <button
                      className={`choice-button ${selectedChoice === choice ? "selected" : ""}`}
                      onClick={() => handleChoiceClick({choice, votes})}
                    >
                      {`${choice}: ${votes} votes`}
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

export default QuestionDetails
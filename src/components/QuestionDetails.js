import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import './QuestionDetails.css'
import '../App.css';
import ShareModal from './ShareModal';
import {getQuestion, putQuestionVote} from '../api'
import Question from '../screens/Question';
import TopScreenFeatures from '../screens/TopScreen';



function QuestionDetails() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const fetchQuestion = useCallback( async () => {
    try {
      const data =  await getQuestion(id)
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
      <TopScreenFeatures
      handleShare={handleShare}
      />
      <ShareModal isOpen={isModalOpen} onClose={handleModalClose} />
      <div className="question-container">
        {question ? (
            <Question
                question={question}
                selectedChoice={selectedChoice}
                handleChoiceClick={handleChoiceClick}
                handleVote={handleVote}
              />
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
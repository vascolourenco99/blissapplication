import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import './QuestionDetail.css'
import './App.css';
import ShareModal from './ShareModal';


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

  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice.choice);
    setSelectedChoiceVotes(choice.votes);
  };

  const handleVote = async () => {
    if (!selectedChoice) {
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
  
    const mergedQuestion = {
      ...question,
      choices: question.choices.map((choice) => {
        const updatedChoice = updatedChoices.find((c) => c.choice === choice.choice);
        if (updatedChoice) {
          return {
            ...choice,
            votes: choice.votes + updatedChoice.votes,
          };
        }
        return choice;
      }),
    };
  
    console.log("A resposta atualizada")
    console.log(mergedQuestion);
  
    try {
      const response = await fetch(
        `https://private-anon-2c8b79ecec-blissrecruitmentapi.apiary-mock.com/questions/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mergedQuestion),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        setQuestion(data);
        console.log("data for PUT")
        console.log(data)
      } else {
        console.error(`Error updating question with id ${id}:`, response);
      }
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
    <div className="question-container">
      {question ? (
        <>
          <h1 className="question-title">{question.question}</h1>
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
          <div className='buttons'>
            <button className="search-button" onClick={() => window.history.back()}>
              Back
            </button>
            <button className="search-button" onClick={handleVote} disabled={!selectedChoice}>
              Vote
            </button>
            <button className="search-button" onClick={handleShare}>
            Share
          </button>
          <ShareModal isOpen={isModalOpen} onClose={handleModalClose} />
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
import React from 'react';

function Question({ question, selectedChoice, handleChoiceClick, handleVote }) {
  return (
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
  );
}

export default Question;

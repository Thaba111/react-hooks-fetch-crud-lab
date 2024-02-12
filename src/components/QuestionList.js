// QuestionList.js

import React from 'react';
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onUpdateCorrectIndex }) {
  const handleCorrectIndexChange = async (id, correctIndex) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correctIndex })
      });
      if (!response.ok) {
        throw new Error('Failed to update correct index');
      }
      onUpdateCorrectIndex(id, correctIndex);
    } catch (error) {
      console.error('Error updating correct index:', error);
    }
  };

  return (
    <div>
      <h2>Question List</h2>
      <ul>
        {questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onDeleteQuestion={onDeleteQuestion}
            onUpdateCorrectIndex={handleCorrectIndexChange}
          />
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;

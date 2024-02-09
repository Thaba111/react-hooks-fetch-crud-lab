import React from 'react';

function QuestionList({ questions, onDeleteQuestion, onUpdateCorrectIndex }) {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete question');
      }
      onDeleteQuestion(id);
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

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
          <li key={question.id}>
            {question.prompt}
            <select value={question.correctIndex} onChange={(e) => handleCorrectIndexChange(question.id, e.target.value)}>
              {question.answers.map((answer, index) => (
                <option key={index} value={index}>{answer}</option>
              ))}
            </select>
            <button onClick={() => handleDelete(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;

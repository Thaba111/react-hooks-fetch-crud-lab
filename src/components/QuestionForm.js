import React, { useState } from "react";

function QuestionForm({ onNewQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to add question');
      }
      const newQuestion = await response.json();
      onNewQuestion(newQuestion);
      // Reset form data after successful submission
      setFormData({
        prompt: "",
        answers: ["", "", "", ""],
        correctIndex: 0
      });
    } catch (error) {
      console.error('Error adding question:', error);
    }
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        {formData.answers.map((answer, index) => (
          <label key={index}>
            {`Answer ${index + 1}:`}
            <input
              type="text"
              name={`answers[${index}]`}
              value={answer}
              onChange={(e) => {
                const newAnswers = [...formData.answers];
                newAnswers[index] = e.target.value;
                setFormData({ ...formData, answers: newAnswers });
              }}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {formData.answers.map((_, index) => (
              <option key={index} value={index}>{`Answer ${index + 1}`}</option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;

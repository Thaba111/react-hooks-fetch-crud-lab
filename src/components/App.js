// App.js

import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched questions:', data);
        setQuestions(data);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleNewQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter(question => question.id !== id));
  };

  const handleUpdateCorrectIndex = (id, correctIndex) => {
    setQuestions(questions.map(question => {
      if (question.id === id) {
        return { ...question, correctIndex };
      }
      return question;
    }));
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onNewQuestion={handleNewQuestion} /> : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} onUpdateCorrectIndex={handleUpdateCorrectIndex} />}
    </main>
  );
}

export default App;

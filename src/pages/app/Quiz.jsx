import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QuizList from '../../components/sections/quiz/QuizList';
import QuizAccess from '../../components/sections/quiz/QuizAccess';
import QuizSession from '../../components/sections/quiz/QuizSession';
import QuizResult from '../../components/sections/quiz/QuizResult';
import Layout from '../../components/sections/quiz/QuizLayout';

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizAccess, setQuizAccess] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  
  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
    setQuizAccess(false);
    setQuizResults(null);
  };
  
  const handleQuizAccess = (access) => {
    setQuizAccess(access);
  };
  
  const handleQuizComplete = (results) => {
    setQuizResults(results);
  };
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<QuizList onSelectQuiz={handleQuizSelect} />} />
          <Route 
            path="access" 
            element={
              selectedQuiz ? 
                <QuizAccess 
                  quiz={selectedQuiz} 
                  onAccess={handleQuizAccess} 
                /> : 
                <Navigate to="/" replace />
            } 
          />
          <Route 
            path="quiz" 
            element={
              selectedQuiz && quizAccess ? 
                <QuizSession 
                  quiz={selectedQuiz} 
                  onComplete={handleQuizComplete} 
                /> : 
                <Navigate to={selectedQuiz ? "/access" : "/"} replace />
            } 
          />
          <Route 
            path="results" 
            element={
              quizResults ? 
                <QuizResult 
                  results={quizResults} 
                  quiz={selectedQuiz} 
                /> : 
                <Navigate to="/" replace />
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
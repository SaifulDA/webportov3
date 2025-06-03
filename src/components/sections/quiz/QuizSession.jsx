/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionNavigator from './QuestionNavigator';
import QuestionDisplay from './QuestionDisplay';
import QuizTimer from './QuizTimer';
import ConfirmModal from './ConfirmModal';

function QuizSession({ quiz, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60); // Convert to seconds
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isTimeoutModalOpen, setIsTimeoutModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Create a ref to store the questions
  const questionsRef = useRef(quiz.questions || []);
  const questions = questionsRef.current;

  useEffect(() => {
    // Check if any answers were stored in sessionStorage
    const storedAnswers = sessionStorage.getItem(`quiz_${quiz.id}_answers`);
    const storedTime = sessionStorage.getItem(`quiz_${quiz.id}_time`);
    
    if (storedAnswers) {
      setUserAnswers(JSON.parse(storedAnswers));
    } else {
      // Initialize empty answers object
      const initialAnswers = {};
      questions.forEach((_, index) => {
        initialAnswers[index] = null;
      });
      setUserAnswers(initialAnswers);
    }
    
    if (storedTime) {
      setTimeRemaining(parseInt(storedTime, 10));
    }
    
    // Disable copy-paste functionality
    const handleCopy = (e) => {
      e.preventDefault();
      return false;
    };
    
    const handlePaste = (e) => {
      e.preventDefault();
      return false;
    };
    
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    
    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
    };
  }, [quiz.id]);
  
  // Save answers to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem(`quiz_${quiz.id}_answers`, JSON.stringify(userAnswers));
  }, [userAnswers, quiz.id]);
  
  // Save remaining time to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(`quiz_${quiz.id}_time`, timeRemaining.toString());
  }, [timeRemaining, quiz.id]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const navigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmitQuiz = () => {
    // Check if all questions are answered
    const unansweredQuestions = Object.values(userAnswers).filter(answer => answer === null).length;
    
    if (unansweredQuestions > 0) {
      alert(`Anda masih memiliki ${unansweredQuestions} pertanyaan yang belum dijawab. Silakan jawab semua pertanyaan sebelum menyelesaikan quiz.`);
      return;
    }
    
    setIsSubmitModalOpen(true);
  };
  
  const confirmSubmitQuiz = () => {
    setIsSubmitModalOpen(false);
    submitQuizResults();
  };
  
  const cancelSubmitQuiz = () => {
    setIsSubmitModalOpen(false);
  };
  
  const handleTimeOut = () => {
    setIsTimeoutModalOpen(true);
  };
  
  const confirmTimeOut = () => {
    setIsTimeoutModalOpen(false);
    submitQuizResults();
  };

  const submitQuizResults = () => {
    // Calculate results
    let correctAnswers = 0;
    let totalQuestions = questions.length;
    
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswerIndex) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    const results = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      totalQuestions,
      correctAnswers,
      wrongAnswers: totalQuestions - correctAnswers,
      score,
      userAnswers,
      timeUsed: (quiz.timeLimit * 60) - timeRemaining,
      timeLimit: quiz.timeLimit * 60,
      completedAt: new Date().toISOString()
    };
    
    // Clear session storage
    sessionStorage.removeItem(`quiz_${quiz.id}_answers`);
    sessionStorage.removeItem(`quiz_${quiz.id}_time`);
    
    // Pass results to parent component
    onComplete(results);
    
    // Navigate to results page
    navigate('/results');
  };

  const currentQuestion = questions[currentQuestionIndex];
  
  if (!currentQuestion) {
    return <div className="flex justify-center mt-12">Loading questions...</div>;
  }

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const allQuestionsAnswered = Object.values(userAnswers).every(answer => answer !== null);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">{quiz.title}</h2>
        <QuizTimer 
          initialTime={timeRemaining} 
          onTimeUpdate={setTimeRemaining} 
          onTimeOut={handleTimeOut} 
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <QuestionDisplay 
          question={currentQuestion}
          questionIndex={currentQuestionIndex}
          userAnswer={userAnswers[currentQuestionIndex]}
          onAnswerSelect={(answer) => handleAnswerSelect(currentQuestionIndex, answer)}
        />
        
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 ${
              currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Sebelumnya
          </button>
          
          {isLastQuestion ? (
            <button
              onClick={handleSubmitQuiz}
              className={`px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                !allQuestionsAnswered ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!allQuestionsAnswered}
            >
              Selesaikan Quiz
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Selanjutnya
            </button>
          )}
        </div>
      </div>
      
      <QuestionNavigator 
        totalQuestions={questions.length}
        currentQuestionIndex={currentQuestionIndex}
        userAnswers={userAnswers}
        onNavigate={navigateToQuestion}
      />
      
      <div className="mt-6 text-center">
        <button
          onClick={handleSubmitQuiz}
          className={`px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-200 ${
            !allQuestionsAnswered ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!allQuestionsAnswered}
        >
          Selesaikan Quiz
        </button>
      </div>
      
      <ConfirmModal 
        isOpen={isSubmitModalOpen}
        title="Selesaikan Quiz?"
        message="Apakah Anda yakin ingin menyelesaikan quiz ini? Anda tidak akan dapat mengubah jawaban setelah mengirimkan."
        confirmText="Ya, Selesaikan"
        cancelText="Tidak, Kembali"
        onConfirm={confirmSubmitQuiz}
        onCancel={cancelSubmitQuiz}
      />
      
      <ConfirmModal 
        isOpen={isTimeoutModalOpen}
        title="Waktu Habis!"
        message="Waktu pengerjaan quiz telah habis. Quiz akan diselesaikan secara otomatis."
        confirmText="Lihat Hasil"
        onConfirm={confirmTimeOut}
        hideCancel={true}
      />
    </div>
  );
}

export default QuizSession;
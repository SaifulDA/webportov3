/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import quizData from '../../../services/QuizData';

function QuizList({ onSelectQuiz }) {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading quiz data from an API
    const fetchQuizzes = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setQuizzes(quizData);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error loading quizzes:', error);
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizSelect = (quiz) => {
    onSelectQuiz(quiz);
    navigate('/access');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Pilih Quiz</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div 
            key={quiz.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleQuizSelect(quiz)}
          >
            <div className="h-48 bg-blue-100 flex items-center justify-center">
              <img 
                src={quiz.image || `/api/placeholder/300/200`} 
                alt={quiz.title} 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{quiz.questionCount} Pertanyaan</span>
                <span>{quiz.timeLimit} Menit</span>
              </div>
              <p className="mt-2 text-gray-700 line-clamp-2">{quiz.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  quiz.difficulty === 'Mudah' ? 'bg-green-100 text-green-800' :
                  quiz.difficulty === 'Sedang' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {quiz.difficulty}
                </span>
                <button 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuizSelect(quiz);
                  }}
                >
                  Mulai Quiz
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizList;
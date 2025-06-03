/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultSummary from './ResultSummary';
import ResultDetails from './ResultDetail';

function QuizResult({ results, quiz }) {
  const [activeTab, setActiveTab] = useState('summary');
  const navigate = useNavigate();
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  if (!results) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Hasil tidak tersedia</h2>
        <p className="text-gray-600 mb-6">Anda belum menyelesaikan quiz apapun.</p>
        <button
          onClick={handleBackToHome}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }
  
  const downloadResults = () => {
    // Create result text
    const resultText = `
Quiz Result: ${results.quizTitle}
Date: ${new Date(results.completedAt).toLocaleString()}
Score: ${results.score}%
Correct Answers: ${results.correctAnswers} out of ${results.totalQuestions}
Time Used: ${formatTime(results.timeUsed)} / ${formatTime(results.timeLimit)}
    `;
    
    // Create blob and download
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quiz-result-${results.quizId}-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hasil Quiz: {results.quizTitle}</h2>
        <span className="text-sm text-gray-500">
          {new Date(results.completedAt).toLocaleString()}
        </span>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`py-4 px-6 text-center font-medium ${
                activeTab === 'summary' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('summary')}
            >
              Ringkasan
            </button>
            <button
              className={`py-4 px-6 text-center font-medium ${
                activeTab === 'details' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('details')}
            >
              Detail Jawaban
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'summary' ? (
            <ResultSummary results={results} />
          ) : (
            <ResultDetails 
              results={results} 
              questions={quiz.questions}
            />
          )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleBackToHome}
          className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          Kembali ke Beranda
        </button>
        
        <button
          onClick={downloadResults}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          Unduh Hasil
        </button>
      </div>
    </div>
  );
}

export default QuizResult;
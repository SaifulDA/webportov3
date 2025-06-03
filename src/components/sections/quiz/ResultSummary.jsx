/* eslint-disable react/prop-types */
import { CircleCheck, CircleX, Clock } from 'lucide-react';

function ResultSummary({ results }) {
  // Format time (seconds) to minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  // Get score color based on score value
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };
  
  // Get score message based on score value
  const getScoreMessage = (score) => {
    if (score >= 80) return "Sangat Baik!";
    if (score >= 60) return "Baik";
    if (score >= 40) return "Cukup";
    return "Perlu Ditingkatkan";
  };
  
  const scoreColor = getScoreColor(results.score);
  const scoreMessage = getScoreMessage(results.score);
  
  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-block mb-4">
          <div className={`text-7xl font-bold ${scoreColor}`}>
            {results.score}%
          </div>
          <div className={`text-xl font-medium ${scoreColor}`}>
            {scoreMessage}
          </div>
        </div>
        
        <div className="h-4 w-full bg-gray-200 rounded-full mt-2">
          <div 
            className={`h-full rounded-full ${
              results.score >= 80 ? 'bg-green-500' :
              results.score >= 60 ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
            style={{ width: `${results.score}%` }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center mb-2">
            <CircleCheck className="text-green-500 mr-2" size={20} />
            <h3 className="font-medium">Jawaban Benar</h3>
          </div>
          <div className="text-3xl font-bold text-green-500">{results.correctAnswers}</div>
          <div className="text-sm text-gray-500">dari {results.totalQuestions} pertanyaan</div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <div className="flex items-center mb-2">
            <CircleX className="text-red-500 mr-2" size={20} />
            <h3 className="font-medium">Jawaban Salah</h3>
          </div>
          <div className="text-3xl font-bold text-red-500">{results.wrongAnswers}</div>
          <div className="text-sm text-gray-500">dari {results.totalQuestions} pertanyaan</div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center mb-2">
            <Clock className="text-blue-500 mr-2" size={20} />
            <h3 className="font-medium">Waktu</h3>
          </div>
          <div className="text-3xl font-bold text-blue-500">{formatTime(results.timeUsed)}</div>
          <div className="text-sm text-gray-500">dari {formatTime(results.timeLimit)}</div>
        </div>
      </div>
      
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium mb-4">Statistik Jawaban</h3>
        <div className="flex items-center justify-center">
          <div className="h-48 w-48">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Correct answers pie slice */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#10B981"
                strokeWidth="20"
                strokeDasharray={`${(results.correctAnswers / results.totalQuestions) * 251.2} 251.2`}
                transform="rotate(-90 50 50)"
              />
              
              {/* Wrong answers pie slice */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#EF4444"
                strokeWidth="20"
                strokeDasharray={`${(results.wrongAnswers / results.totalQuestions) * 251.2} 251.2`}
                strokeDashoffset={`${-(results.correctAnswers / results.totalQuestions) * 251.2}`}
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
          
          <div className="ml-8">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span>Benar: {Math.round((results.correctAnswers / results.totalQuestions) * 100)}%</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <span>Salah: {Math.round((results.wrongAnswers / results.totalQuestions) * 100)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultSummary;
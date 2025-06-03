/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

function QuestionDisplay({ question, questionIndex, userAnswer, onAnswerSelect }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  useEffect(() => {
    // Update the selected answer when the question changes or userAnswer is loaded
    setSelectedAnswer(userAnswer);
  }, [question, userAnswer]);
  
  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    onAnswerSelect(answerIndex);
  };
  
  // Prevent text selection to make copy-pasting more difficult
  const preventTextSelection = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <div>
      <div className="mb-2 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">
          Pertanyaan {questionIndex + 1}
        </span>
      </div>
      
      <div 
        className="text-lg font-medium mb-6"
        onCopy={preventTextSelection}
        onCut={preventTextSelection}
        onSelect={preventTextSelection}
      >
        {question.questionText}
      </div>
      
      {question.image && (
        <div className="mb-6">
          <img 
            src={question.image} 
            alt="Question illustration" 
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      )}
      
      <div className="space-y-3">
        {question.answers.map((answer, index) => (
          <div 
            key={index}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedAnswer === index 
                ? 'bg-blue-50 border-blue-400' 
                : 'hover:bg-gray-50 border-gray-200'
            }`}
            onClick={() => handleAnswerSelect(index)}
            onCopy={preventTextSelection}
            onCut={preventTextSelection}
            onSelect={preventTextSelection}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div 
                  className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                    selectedAnswer === index 
                      ? 'bg-blue-500 border-blue-500 text-white' 
                      : 'border-gray-400'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
              </div>
              
              <div className="flex-grow">
                {answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionDisplay;
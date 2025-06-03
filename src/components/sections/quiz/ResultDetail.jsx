/* eslint-disable react/prop-types */
import { CheckCircle, XCircle } from 'lucide-react';

function ResultDetails({ results, questions }) {
  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-6">
        <p>Detail pertanyaan tidak tersedia.</p>
      </div>
    );
  }
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Detail Jawaban</h3>
      <div className="space-y-6">
        {questions.map((question, questionIndex) => {
          const userAnswerIndex = results.userAnswers[questionIndex];
          const correctAnswerIndex = question.correctAnswerIndex;
          const isCorrect = userAnswerIndex === correctAnswerIndex;
          
          return (
            <div 
              key={questionIndex}
              className={`p-4 rounded-lg border ${
                isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3 mt-1">
                  {isCorrect ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <XCircle className="text-red-500" size={20} />
                  )}
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Pertanyaan {questionIndex + 1}</h4>
                    <span className={isCorrect ? 'text-green-500' : 'text-red-500'}>
                      {isCorrect ? 'Benar' : 'Salah'}
                    </span>
                  </div>
                  
                  <p className="mb-4">{question.questionText}</p>
                  
                  <div className="space-y-2">
                    {question.answers.map((answer, answerIndex) => {
                      const isUserAnswer = answerIndex === userAnswerIndex;
                      const isCorrectAnswer = answerIndex === correctAnswerIndex;
                      
                      let answerClasses = "p-3 rounded-lg border ";
                      
                      if (isUserAnswer && isCorrectAnswer) {
                        answerClasses += "border-green-300 bg-green-100";
                      } else if (isUserAnswer) {
                        answerClasses += "border-red-300 bg-red-100";
                      } else if (isCorrectAnswer) {
                        answerClasses += "border-green-300 bg-green-100";
                      } else {
                        answerClasses += "border-gray-200 bg-white";
                      }
                      
                      return (
                        <div key={answerIndex} className={answerClasses}>
                          <div className="flex items-center">
                            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 mr-3 text-sm font-medium">
                              {String.fromCharCode(65 + answerIndex)}
                            </div>
                            <span>{answer}</span>
                            
                            {isUserAnswer && (
                              <span className="ml-auto text-sm">
                                Jawaban Anda
                              </span>
                            )}
                            
                            {isCorrectAnswer && !isUserAnswer && (
                              <span className="ml-auto text-sm text-green-600">
                                Jawaban Benar
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResultDetails;
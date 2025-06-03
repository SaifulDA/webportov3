/* eslint-disable react/prop-types */
function QuestionNavigator({ totalQuestions, currentQuestionIndex, userAnswers, onNavigate }) {
  const questionNumbers = Array.from({ length: totalQuestions }, (_, i) => i);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium mb-4">Navigasi Pertanyaan</h3>
      
      <div className="flex flex-wrap gap-2">
        {questionNumbers.map((index) => {
          const isAnswered = userAnswers[index] !== null;
          const isCurrent = index === currentQuestionIndex;
          
          let buttonClasses = "flex items-center justify-center w-10 h-10 rounded-full border font-medium transition-colors";
          
          if (isCurrent && isAnswered) {
            buttonClasses += " bg-blue-500 text-white border-blue-500";
          } else if (isCurrent) {
            buttonClasses += " bg-blue-100 text-blue-800 border-blue-300";
          } else if (isAnswered) {
            buttonClasses += " bg-green-500 text-white border-green-500 hover:bg-green-600";
          } else {
            buttonClasses += " bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200";
          }
          
          return (
            <button
              key={index}
              className={buttonClasses}
              onClick={() => onNavigate(index)}
              aria-label={`Go to question ${index + 1}`}
              title={`Pertanyaan ${index + 1}${isAnswered ? ' (Sudah dijawab)' : ' (Belum dijawab)'}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
          <span>Sudah dijawab</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-200 mr-1"></div>
          <span>Belum dijawab</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-300 mr-1"></div>
          <span>Sedang aktif</span>
        </div>
      </div>
    </div>
  );
}

export default QuestionNavigator;
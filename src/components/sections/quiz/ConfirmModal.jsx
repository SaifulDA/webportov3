/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';

function QuizTimer({ initialTime, onTimeUpdate, onTimeOut }) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const timerRef = useRef(null);
  
  useEffect(() => {
    // Update the timer every second
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        onTimeUpdate(newTime);
        
        if (newTime <= 0) {
          clearInterval(timerRef.current);
          onTimeOut();
          return 0;
        }
        
        return newTime;
      });
    }, 1000);
    
    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [onTimeUpdate, onTimeOut]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  
  // Calculate percentage of time remaining
  const timePercentage = (timeRemaining / initialTime) * 100;
  
  // Determine color based on time remaining
  let timerColor = "bg-green-500";
  if (timePercentage <= 25) {
    timerColor = "bg-red-500";
  } else if (timePercentage <= 50) {
    timerColor = "bg-yellow-500";
  }
  
  return (
    <div className="flex flex-col items-end">
      <div className="text-lg font-bold mb-1">
        {formatTime(timeRemaining)}
      </div>
      
      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${timerColor} transition-all duration-1000 ease-linear`}
          style={{ width: `${timePercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default QuizTimer;
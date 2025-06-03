/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function QuizAccess({ quiz, onAccess }) {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Simulate API call for validating access code
    setTimeout(() => {
      if (accessCode === quiz.accessCode) {
        onAccess(true);
        navigate('/quiz');
      } else {
        setError('Kode akses tidak valid. Silakan coba lagi.');
        setIsSubmitting(false);
      }
    }, 800);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="max-w-lg mx-auto">
      <button 
        onClick={handleBack}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Daftar Quiz
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
        <p className="text-gray-600 mb-6">{quiz.description}</p>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Informasi Quiz</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="w-36 text-gray-600">Jumlah Pertanyaan:</span>
              <span className="font-medium">{quiz.questionCount}</span>
            </li>
            <li className="flex items-center">
              <span className="w-36 text-gray-600">Batas Waktu:</span>
              <span className="font-medium">{quiz.timeLimit} menit</span>
            </li>
            <li className="flex items-center">
              <span className="w-36 text-gray-600">Tingkat Kesulitan:</span>
              <span className={`font-medium ${
                quiz.difficulty === 'Mudah' ? 'text-green-600' :
                quiz.difficulty === 'Sedang' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {quiz.difficulty}
              </span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="accessCode" className="block text-gray-700 font-medium mb-2">
              Kode Akses
            </label>
            <input
              type="text"
              id="accessCode"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                error ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="Masukkan kode akses quiz"
              required
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memverifikasi...
                </span>
              ) : 'Mulai Quiz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuizAccess;
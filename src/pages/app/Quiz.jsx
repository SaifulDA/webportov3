import { useState, useEffect } from "react";
import { Timer, Check, X, User, Key, BookOpen, Code, MapPin } from "lucide-react";

// Komponen utama aplikasi Quiz
export default function QuizApp() {
  // State untuk akses kode
  const [accessCode, setAccessCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");

  // State untuk quiz
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 menit dalam detik
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedQuizType, setSelectedQuizType] = useState(null);

  // Kode akses yang valid
  const validAccessCodes = ["QUIZ123", "EDUTEST", "QUIZMASTER"];

  // Data bank soal quiz
  const quizTypes = [
    {
      id: "programming",
      title: "Programming Quiz",
      icon: <Code className="w-8 h-8 text-indigo-500" />,
      description: "Tes pengetahuan Anda tentang pemrograman dan teknologi komputer.",
      questions: [
        {
          id: 1,
          question: "Bahasa pemrograman yang sering digunakan untuk pengembangan web frontend adalah?",
          options: ["Java", "C++", "JavaScript", "Python"],
          correctAnswer: "JavaScript",
        },
        {
          id: 2,
          question: "Apa kepanjangan dari HTML?",
          options: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyper Transfer Mode Link", "Home Tool Markup Language"],
          correctAnswer: "Hyper Text Markup Language",
        },
        {
          id: 3,
          question: "Framework CSS yang digunakan dalam aplikasi ini adalah?",
          options: ["Bootstrap", "Tailwind CSS", "Material UI", "Bulma"],
          correctAnswer: "Tailwind CSS",
        },
        {
          id: 4,
          question: "Protokol yang biasa digunakan untuk transfer data pada website adalah?",
          options: ["FTP", "SMTP", "HTTP", "POP3"],
          correctAnswer: "HTTP",
        },
        {
          id: 5,
          question: "Perintah Git untuk mengambil perubahan dari repositori remote adalah?",
          options: ["git push", "git pull", "git commit", "git clone"],
          correctAnswer: "git pull",
        },
        {
          id: 6,
          question: "Bagian dari database yang menyimpan data dalam bentuk baris disebut?",
          options: ["Table", "Record", "Field", "Key"],
          correctAnswer: "Record",
        },
        {
          id: 7,
          question: "Bahasa pemrograman yang dikembangkan oleh Google adalah?",
          options: ["Kotlin", "Swift", "Go", "Ruby"],
          correctAnswer: "Go",
        },
        {
          id: 8,
          question: "Jenis database yang tidak menggunakan SQL disebut?",
          options: ["relational database", "NoSQL database", "MySQL", "SQLite"],
          correctAnswer: "NoSQL database",
        },
      ],
    },
    {
      id: "general",
      title: "Pengetahuan Umum",
      icon: <BookOpen className="w-8 h-8 text-indigo-500" />,
      description: "Uji wawasan Anda tentang beragam fakta dan informasi umum.",
      questions: [
        {
          id: 1,
          question: "Ibukota Indonesia adalah?",
          options: ["Jakarta", "Bandung", "Surabaya", "Yogyakarta"],
          correctAnswer: "Jakarta",
        },
        {
          id: 2,
          question: "Planet terbesar di tata surya kita adalah?",
          options: ["Bumi", "Mars", "Jupiter", "Saturnus"],
          correctAnswer: "Jupiter",
        },
        {
          id: 3,
          question: "Siapakah penemu teori relativitas?",
          options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Thomas Edison"],
          correctAnswer: "Albert Einstein",
        },
        {
          id: 4,
          question: "Berapa jumlah provinsi di Indonesia saat ini?",
          options: ["34", "35", "36", "38"],
          correctAnswer: "38",
        },
        {
          id: 5,
          question: "Huruf kimia untuk emas adalah?",
          options: ["Au", "Ag", "Fe", "Cu"],
          correctAnswer: "Au",
        },
        {
          id: 6,
          question: "Benua terbesar di Bumi adalah?",
          options: ["Afrika", "Amerika", "Eropa", "Asia"],
          correctAnswer: "Asia",
        },
        {
          id: 7,
          question: "Sungai terpanjang di dunia adalah?",
          options: ["Sungai Nil", "Sungai Amazon", "Sungai Mississippi", "Sungai Yangtze"],
          correctAnswer: "Sungai Nil",
        },
        {
          id: 8,
          question: "Hewan tercepat di darat adalah?",
          options: ["Kuda", "Singa", "Cheetah", "Kanguru"],
          correctAnswer: "Cheetah",
        },
      ],
    },
    {
      id: "geography",
      title: "Geografi",
      icon: <MapPin className="w-8 h-8 text-indigo-500" />,
      description: "Tes pengetahuan Anda tentang geografi dunia dan Indonesia.",
      questions: [
        {
          id: 1,
          question: "Gunung tertinggi di dunia adalah?",
          options: ["K2", "Mount Everest", "Kilimanjaro", "Puncak Jaya"],
          correctAnswer: "Mount Everest",
        },
        {
          id: 2,
          question: "Negara terbesar berdasarkan luas wilayah adalah?",
          options: ["China", "Amerika Serikat", "Kanada", "Rusia"],
          correctAnswer: "Rusia",
        },
        {
          id: 3,
          question: "Pulau terbesar di Indonesia adalah?",
          options: ["Sumatera", "Jawa", "Kalimantan", "Papua"],
          correctAnswer: "Kalimantan",
        },
        {
          id: 4,
          question: "Samudra terluas di dunia adalah?",
          options: ["Samudra Atlantik", "Samudra Pasifik", "Samudra Hindia", "Samudra Arktik"],
          correctAnswer: "Samudra Pasifik",
        },
        {
          id: 5,
          question: "Gurun terluas di dunia adalah?",
          options: ["Gurun Gobi", "Gurun Sahara", "Gurun Kalahari", "Gurun Arab"],
          correctAnswer: "Gurun Sahara",
        },
        {
          id: 6,
          question: "Danau terdalam di dunia adalah?",
          options: ["Danau Baikal", "Danau Superior", "Danau Tanganyika", "Danau Victoria"],
          correctAnswer: "Danau Baikal",
        },
        {
          id: 7,
          question: "Selat yang memisahkan Asia dan Amerika Utara adalah?",
          options: ["Selat Gibraltar", "Selat Malaka", "Selat Bering", "Selat Hormuz"],
          correctAnswer: "Selat Bering",
        },
        {
          id: 8,
          question: "Negara dengan populasi terbanyak di dunia adalah?",
          options: ["India", "China", "Amerika Serikat", "Indonesia"],
          correctAnswer: "India",
        },
      ],
    },
  ];

  // Fungsi untuk verifikasi kode akses
  const verifyAccessCode = () => {
    if (!inputCode.trim()) {
      setErrorMessage("Kode akses tidak boleh kosong!");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    // Simulasi verifikasi kode
    setTimeout(() => {
      // Cek apakah kode valid
      if (validAccessCodes.includes(inputCode.trim().toUpperCase())) {
        setAccessCode(inputCode.trim().toUpperCase());
        setIsAuthenticated(true);

        // Simpan di localStorage
        localStorage.setItem("quizAccessCode", inputCode.trim().toUpperCase());
        if (username) {
          localStorage.setItem("quizUsername", username);
        }
      } else {
        setErrorMessage("Kode akses tidak valid!");
      }

      setIsLoading(false);
    }, 1000);
  };

  // Fungsi untuk reset kode akses
  const resetAccess = () => {
    setIsAuthenticated(false);
    setAccessCode("");
    setInputCode("");
    setUsername("");
    localStorage.removeItem("quizAccessCode");
    localStorage.removeItem("quizUsername");
    setQuizStarted(false);
    setSelectedQuizType(null);
    setShowScore(false);
  };

  // Cek jika kode akses sudah ada sebelumnya
  useEffect(() => {
    const savedAccessCode = localStorage.getItem("quizAccessCode");
    const savedUsername = localStorage.getItem("quizUsername");
    if (savedAccessCode) {
      setAccessCode(savedAccessCode);
      setIsAuthenticated(true);
    }
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  // Fungsi untuk mengacak soal
  const shuffleQuestions = (questions) => {
    // Duplikasi array soal
    const shuffled = [...questions];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Hanya ambil 5 soal pertama
    return shuffled.slice(0, 5);
  };

  // Memilih dan memulai quiz
  const startQuiz = (quizType) => {
    const selectedQuiz = quizTypes.find((quiz) => quiz.id === quizType);
    setSelectedQuizType(selectedQuiz);
    setQuestions(shuffleQuestions(selectedQuiz.questions));
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setTimeRemaining(120);
    setQuizStarted(true);
    setIsAnswered(false);
  };

  // Effect untuk timer
  useEffect(() => {
    let timer;
    if (quizStarted && timeRemaining > 0 && !showScore) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && !showScore) {
      setShowScore(true);
    }

    return () => clearInterval(timer);
  }, [quizStarted, timeRemaining, showScore]);

  // Handle memilih jawaban
  const handleAnswerSelect = (answer) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    const isAnswerCorrect = answer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore(score + 1);
    }

    // Tunggu 1 detik sebelum pindah ke pertanyaan berikutnya
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer("");
        setIsAnswered(false);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  // Format waktu dari detik ke mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Render form input kode akses jika belum terautentikasi
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Key className="text-indigo-600 w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Quiz App</h1>

          {errorMessage && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p>{errorMessage}</p>
            </div>
          )}

          <div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accessCode">
                Kode Akses
              </label>
              <div className="flex">
                <div className="bg-gray-100 flex items-center justify-center px-3 rounded-l-lg border border-r-0 border-gray-300">
                  <Key size={18} className="text-gray-500" />
                </div>
                <input
                  id="accessCode"
                  type="text"
                  placeholder="Masukkan kode akses"
                  className="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Nama Pengguna (Opsional)
              </label>
              <div className="flex">
                <div className="bg-gray-100 flex items-center justify-center px-3 rounded-l-lg border border-r-0 border-gray-300">
                  <User size={18} className="text-gray-500" />
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="Masukkan nama pengguna (opsional)"
                  className="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <button onClick={verifyAccessCode} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center" disabled={isLoading}>
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Masuk"
              )}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Masukkan kode akses yang valid untuk memulai quiz</p>
          </div>
        </div>
      </div>
    );
  }

  // Render pilihan quiz setelah kode akses diverifikasi (belum memulai quiz)
  if (!quizStarted && !showScore) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-600">Pilih Quiz</h1>
            <button onClick={resetAccess} className="flex items-center text-gray-500 hover:text-red-500">
              <Key size={20} className="mr-1" />
              <span>Keluar</span>
            </button>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg mb-6">
            {username && (
              <div className="flex items-center mb-2">
                <User className="text-indigo-500 mr-3" />
                <p className="font-medium">{username}</p>
              </div>
            )}
            <div className="flex items-center">
              <Key className="text-indigo-500 mr-3" />
              <p className="font-medium text-indigo-700">Kode Akses: {accessCode}</p>
            </div>
          </div>

          <p className="text-gray-600 mb-6">Pilih jenis quiz yang ingin Anda coba. Setiap quiz berisi 5 pertanyaan acak dengan waktu 2 menit.</p>

          <div className="grid gap-4 mb-6">
            {quizTypes.map((quiz) => (
              <button key={quiz.id} onClick={() => startQuiz(quiz.id)} className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">{quiz.icon}</div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-lg">{quiz.title}</h3>
                  <p className="text-gray-600 text-sm">{quiz.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render hasil quiz
  if (showScore) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-600">Hasil Quiz</h1>
            <button onClick={resetAccess} className="flex items-center text-gray-500 hover:text-red-500">
              <Key size={20} className="mr-1" />
              <span>Keluar</span>
            </button>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg mb-6">
            <p className="font-medium text-indigo-700 mb-1">Quiz: {selectedQuizType?.title}</p>
            {username && (
              <div className="flex items-center justify-center">
                <User className="text-indigo-500 mr-2" />
                <p className="font-medium">{username}</p>
              </div>
            )}
          </div>

          <div className="mb-8">
            <div className="relative w-40 h-40 mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-indigo-600">{percentage}%</span>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="10" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#4f46e5" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${percentage * 2.83} 283`} transform="rotate(-90 50 50)" />
              </svg>
            </div>
          </div>

          <p className="text-xl mb-2">Skor Anda:</p>
          <p className="text-3xl font-bold text-indigo-600 mb-6">
            {score} dari {questions.length}
          </p>

          {timeRemaining === 0 && <p className="text-red-500 mb-6">Waktu habis!</p>}

          <div className="flex space-x-4">
            <button onClick={() => startQuiz(selectedQuizType.id)} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
              Coba Lagi
            </button>
            <button
              onClick={() => {
                setShowScore(false);
                setQuizStarted(false);
              }}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Pilih Quiz Lain
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render pertanyaan quiz
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-4 mb-4 flex justify-between items-center">
        <div className="font-bold">
          Pertanyaan {currentQuestionIndex + 1}/{questions.length}
        </div>
        <div className="flex items-center">
          <Timer className="text-indigo-500 mr-2" size={20} />
          <span className={`font-mono font-bold ${timeRemaining < 30 ? "text-red-500" : ""}`}>{formatTime(timeRemaining)}</span>
        </div>
        <div className="flex items-center">
          {username && (
            <>
              <User className="text-indigo-500 mr-2" size={16} />
              <span className="mr-3">{username}</span>
            </>
          )}
          <span className="font-bold">Skor: {score}</span>
        </div>
      </div>

      {/* Quiz Info */}
      <div className="bg-white rounded-lg shadow p-3 mb-4 flex items-center">
        <div className="bg-indigo-100 p-2 rounded-full mr-3">{selectedQuizType.icon}</div>
        <div>
          <p className="text-sm text-gray-600">Quiz:</p>
          <p className="font-medium">{selectedQuizType.title}</p>
        </div>
      </div>

      {/* Konten Quiz */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex-grow">
        <h2 className="text-xl font-bold mb-6">{currentQuestion.question}</h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={isAnswered}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                isAnswered && option === selectedAnswer
                  ? isCorrect
                    ? "bg-green-100 border-green-500"
                    : "bg-red-100 border-red-500"
                  : isAnswered && option === currentQuestion.correctAnswer
                  ? "bg-green-100 border-green-500"
                  : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {isAnswered && option === selectedAnswer && (isCorrect ? <Check className="text-green-500" /> : <X className="text-red-500" />)}
                {isAnswered && option === currentQuestion.correctAnswer && option !== selectedAnswer && <Check className="text-green-500" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 bg-gray-200 rounded-full h-2.5">
        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}></div>
      </div>
    </div>
  );
}

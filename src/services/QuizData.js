// Data quiz dummy untuk contoh aplikasi
const quizData = [
  {
    id: '1',
    title: 'Pengetahuan Umum',
    description: 'Quiz tentang pengetahuan umum mencakup berbagai topik dari sejarah, geografi, sains, dan budaya populer.',
    image: '/api/placeholder/400/200',
    difficulty: 'Mudah',
    timeLimit: 10, // dalam menit
    questionCount: 5,
    accessCode: '1234',
    questions: [
      {
        questionText: 'Apa ibukota Indonesia?',
        answers: [
          'Jakarta',
          'Bandung',
          'Surabaya',
          'Bali'
        ],
        correctAnswerIndex: 0
      },
      {
        questionText: 'Planet apa yang paling dekat dengan matahari?',
        answers: [
          'Venus',
          'Bumi',
          'Merkurius',
          'Mars'
        ],
        correctAnswerIndex: 2
      },
      {
        questionText: 'Siapakah yang menemukan teori relativitas?',
        answers: [
          'Isaac Newton',
          'Albert Einstein',
          'Nikola Tesla',
          'Stephen Hawking'
        ],
        correctAnswerIndex: 1
      },
      {
        questionText: 'Hewan apa yang merupakan simbol negara Australia?',
        answers: [
          'Koala',
          'Kangguru',
          'Emu',
          'Platypus'
        ],
        correctAnswerIndex: 1
      },
      {
        questionText: 'Siapakah presiden pertama Indonesia?',
        answers: [
          'Soekarno',
          'Soeharto',
          'Habibie',
          'Megawati'
        ],
        correctAnswerIndex: 0
      }
    ]
  },
  {
    id: '2',
    title: 'Pemrograman Dasar',
    description: 'Test pengetahuan dasar tentang pemrograman, algoritma, dan konsep penting dalam pengembangan perangkat lunak.',
    image: '/api/placeholder/400/200',
    difficulty: 'Sedang',
    timeLimit: 15,
    questionCount: 5,
    accessCode: '5678',
    questions: [
      {
        questionText: 'Apa kepanjangan dari HTML?',
        answers: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Hyper Transfer Markup Language',
          'Home Tool Markup Language'
        ],
        correctAnswerIndex: 0
      },
      {
        questionText: 'Bahasa pemrograman apa yang dikembangkan oleh Microsoft?',
        answers: [
          'Python',
          'Java',
          'C#',
          'PHP'
        ],
        correctAnswerIndex: 2
      },
      {
        questionText: 'Apa itu algoritma?',
        answers: [
          'Jenis bahasa pemrograman',
          'Sebuah perangkat keras komputer',
          'Langkah-langkah untuk menyelesaikan masalah',
          'Jenis database'
        ],
        correctAnswerIndex: 2
      },
      {
        questionText: 'Apa fungsi utama CSS dalam pengembangan web?',
        answers: [
          'Mengatur struktur halaman web',
          'Mengatur tampilan dan gaya halaman web',
          'Menjalankan script pada halaman web',
          'Menyimpan data pada halaman web'
        ],
        correctAnswerIndex: 1
      },
      {
        questionText: 'Apa itu variabel dalam pemrograman?',
        answers: [
          'Sebuah fungsi untuk memproses data',
          'Nama untuk lokasi memori yang menyimpan data',
          'Sebuah metode untuk mengulang kode',
          'Jenis database'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: '3',
    title: 'Sains dan Teknologi',
    description: 'Quiz tentang ilmu pengetahuan dan teknologi modern yang mengubah dunia kita.',
    image: '/api/placeholder/400/200',
    difficulty: 'Sulit',
    timeLimit: 20,
    questionCount: 5,
    accessCode: '9012',
    questions: [
      {
        questionText: 'Apa itu AI (Artificial Intelligence)?',
        answers: [
          'Kemampuan komputer untuk memproses informasi',
          'Simulasi kecerdasan manusia dalam mesin',
          'Robot yang menyerupai manusia',
          'Software untuk desain grafis'
        ],
        correctAnswerIndex: 1
      },
      {
        questionText: 'Apa itu blockchain?',
        answers: [
          'Sejenis virus komputer',
          'Sistem keamanan untuk jaringan komputer',
          'Teknologi database terdistribusi untuk mencatat transaksi',
          'Metode untuk mempercepat koneksi internet'
        ],
        correctAnswerIndex: 2
      },
      {
        questionText: 'Manakah dari berikut ini yang merupakan contoh energi terbarukan?',
        answers: [
          'Batu bara',
          'Gas alam',
          'Minyak bumi',
          'Tenaga surya'
        ],
        correctAnswerIndex: 3
      },
      {
        questionText: 'Apa itu Internet of Things (IoT)?',
        answers: [
          'Protokol internet terbaru',
          'Jaringan perangkat fisik yang terhubung dan bertukar data',
          'Sistem untuk mengakses internet dari perangkat mobile',
          'Sistem operasi untuk perangkat smart'
        ],
        correctAnswerIndex: 1
      },
      {
        questionText: 'Apa yang dimaksud dengan cloud computing?',
        answers: [
          'Teknologi untuk memprediksi cuaca',
          'Penggunaan server jarak jauh di internet untuk menyimpan dan mengelola data',
          'Sistem komputasi yang sangat cepat',
          'Teknologi untuk membuat gambar 3D'
        ],
        correctAnswerIndex: 1
      }
    ]
  }
];

export default quizData;
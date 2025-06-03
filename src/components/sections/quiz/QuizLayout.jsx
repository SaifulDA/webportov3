import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">QuizMaster</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} QuizMaster App</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
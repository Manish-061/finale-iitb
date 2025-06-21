import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorProvider from './components/CursorProvider';

// Pages
import HomePage from './pages/Home';
import AboutUsPage from './pages/AboutUs';
import ProgramsPage from './pages/Programs';
import ContactUsPage from './pages/ContactUs';
import VerifyCertificatePage from './pages/VerifyCertificate';

// Hooks
import { useAnimation } from './contexts/AnimationContext';

const App = () => {
  // Loader state
  const [loading, setLoading] = useState(true);
  const { animationsEnabled } = useAnimation();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Loading animation
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          <div className="mt-4 text-xl font-semibold text-blue-600">INLIGHN TECH</div>
          <div className="mt-2 text-sm text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <CursorProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/verify" element={<VerifyCertificatePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CursorProvider>
  );
};

export default App;

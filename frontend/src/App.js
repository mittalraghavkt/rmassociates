import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Industries from './pages/Industries';
import WhyUs from './pages/WhyUs';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const PublicLayout = ({ children }) => (
  <div className="clean-layout-wrapper">
    <Header />
    {children}
    <Footer />
    <ScrollToTop />
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  
  // Scans the screen and instantly removes the hidden watermark if it loads
  useEffect(() => {
    const removeWatermark = () => {
      const elements = document.querySelectorAll('*');
      elements.forEach(el => {
        if (el.textContent && el.textContent.includes('Made by Emergent')) {
          el.style.setProperty('display', 'none', 'important');
        }
      });
    };
    removeWatermark();
    const observer = new MutationObserver(removeWatermark);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [location]);

  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    );
  }

  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </PublicLayout>
  );
};

function App() {
  return (
    <div className="App clean-root">
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

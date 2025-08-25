import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Authentication/Login/Login';
import Home from './components/Home';
import UnitsPage from './pages/Units/Units';
import UnitDetailPage from './pages/UnitDetail/UnitDetail';
import HYEWPage from './pages/HYEW/HYEW';
import ProfilePage from './pages/Profile/Profile';
import SettingsPage from './pages/Settings/Settings';
import HelpPage from './pages/Help/Help';
import Navbar from './components/Navigation/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Layout component for pages with navbar
const LayoutWithNavbar = ({ children }) => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);

  const handleNavbarToggle = (collapsed) => {
    setIsNavbarCollapsed(collapsed);
  };

  return (
    <div className={`app-layout ${isNavbarCollapsed ? 'navbar-collapsed' : ''}`}>
      <Navbar onToggle={handleNavbarToggle} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Login page without navbar */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Pages with navbar */}
          <Route path="/home" element={
            <LayoutWithNavbar>
              <Home />
            </LayoutWithNavbar>
          } />
          <Route path="/units" element={
            <LayoutWithNavbar>
              <UnitsPage />
            </LayoutWithNavbar>
          } />
          <Route path="/units/:unitId" element={
            <LayoutWithNavbar>
              <UnitDetailPage />
            </LayoutWithNavbar>
          } />
          <Route path="/units/:unitId/hyew" element={
            <LayoutWithNavbar>
              <HYEWPage />
            </LayoutWithNavbar>
          } />
          <Route path="/profile" element={
            <LayoutWithNavbar>
              <ProfilePage />
            </LayoutWithNavbar>
          } />
          <Route path="/settings" element={
            <LayoutWithNavbar>
              <SettingsPage />
            </LayoutWithNavbar>
          } />
          <Route path="/help" element={
            <LayoutWithNavbar>
              <HelpPage />
            </LayoutWithNavbar>
          } />
          
          {/* Default redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

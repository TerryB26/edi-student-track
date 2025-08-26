import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { subscribeProgress } from './lib/progress';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/Authentication/Login/Login';
import ForgotPasswordPage from './pages/Authentication/ForgotPassword/ForgotPassword';
import Home from './components/Home';
import UnitsPage from './pages/Units/Units';
import UnitDetailPage from './pages/UnitDetail/UnitDetail';
import HYEWPage from './pages/HYEW/HYEW';
import HYEW2Page from './pages/HYEW2/HYEW2';
import CoachNovaPage from './pages/CoachNova/CoachNova';
import ProfilePage from './pages/Profile/Profile';
import EasterEgg3Page from './pages/EasterEgg3/EasterEgg3';
import SettingsPage from './pages/Settings/Settings';
import HelpPage from './pages/Help/Help';
import Navbar from './components/Navigation/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          
          <Route path="/home" element={
            <ProtectedRoute>
            <LayoutWithNavbar>
              <Home />
            </LayoutWithNavbar>
            </ProtectedRoute>
          } />
          <Route path="/units" element={
            <ProtectedRoute>
            <LayoutWithNavbar>
              <UnitsPage />
            </LayoutWithNavbar>
            </ProtectedRoute>
          } />
          <Route path="/units/:unitId" element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <UnitDetailPage />
              </LayoutWithNavbar>
            </ProtectedRoute>
          } />
          <Route path="/units/:unitId/hyew" element={
            <UnitProtectedRoute>
              <LayoutWithNavbar>
                <HYEWPage />
              </LayoutWithNavbar>
            </UnitProtectedRoute>
          } />
          <Route path="/units/:unitId/hyew2" element={
            <UnitProtectedRoute>
              <LayoutWithNavbar>
                <HYEW2Page />
              </LayoutWithNavbar>
            </UnitProtectedRoute>
          } />
          <Route path="/units/:unitId/easter-egg" element={
            <UnitProtectedRoute>
              <LayoutWithNavbar>
                <EasterEgg3Page />
              </LayoutWithNavbar>
            </UnitProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <ProfilePage />
              </LayoutWithNavbar>
            </ProtectedRoute>
          } />
          <Route path="/coach-nova" element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <CoachNovaPage />
              </LayoutWithNavbar>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <SettingsPage />
              </LayoutWithNavbar>
            </ProtectedRoute>
          } />
          <Route path="/help" element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <HelpPage />
              </LayoutWithNavbar>
            </ProtectedRoute>
          } />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function UnitProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const { unitId } = useParams();
  const [allowed, setAllowed] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      setReady(true);
      setAllowed(false);
      return;
    }
    const unsub = subscribeProgress((p) => {
      const id = Number(unitId) || 1;
      const can = id === 1 || (p.completedUnitIds || []).includes(id - 1);
      setAllowed(can);
      setReady(true);
    });
    return unsub;
  }, [isAuthenticated, unitId]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!ready) return null;
  if (!allowed) return <Navigate to="/units" replace />;
  return children;
}

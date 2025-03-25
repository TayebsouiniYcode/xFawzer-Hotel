import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages publiques
import Home from './pages/Home/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// Importer d'autres pages publiques si nécessaire

// Routes admin
import AdminRoutes from './routes/AdminRoutes';

// Contexte d'authentification (à implémenter)
// import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    // <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Routes admin - utilise un layout partagé et des routes imbriquées */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          
          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    // </AuthProvider>
  );
};

export default App;
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import RoomManagement from '../pages/admin/RoomManagement';
import BookingManagement from '../pages/admin/BookingManagement';
// import AdminDashboard from '../pages/admin/RoomManagement';

// Importez d'autres pages admin ici
// import ClientManagement from '../pages/admin/ClientManagement';
// import EmployeeManagement from '../pages/admin/EmployeeManagement';
// import ServiceManagement from '../pages/admin/ServiceManagement';
// import ReportManagement from '../pages/admin/ReportManagement';
// import AdminSettings from '../pages/admin/AdminSettings';

interface AdminRoutesProps {
  // Vous pouvez passer des props comme les fonctions d'authentification, etc.
  isAuthenticated?: boolean;
}

const AdminRoutes: React.FC<AdminRoutesProps> = ({ isAuthenticated = true }) => {
  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
      <Route path="rooms" element={<RoomManagement />} />
      <Route path="bookings" element={<BookingManagement />} />
      
      {/* Uncomment these routes as you implement the corresponding pages
      <Route path="clients" element={<ClientManagement />} />
      <Route path="staff" element={<EmployeeManagement />} />
      <Route path="services" element={<ServiceManagement />} />
      <Route path="reports" element={<ReportManagement />} />
      <Route path="settings" element={<AdminSettings />} />
      */}
      
      {/* Redirect to dashboard by default */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
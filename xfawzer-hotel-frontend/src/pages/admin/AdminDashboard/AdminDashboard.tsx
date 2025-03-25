import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';

// Importez les types nécessaires
import { AdminUser, NotificationType } from '../../../types/admin.types';

// Données fictives pour le développement
const dummyUser: AdminUser = {
  id: '1',
  name: 'Thomas Dubois',
  email: 'thomas.dubois@luxstay.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  role: 'admin'
};

const dummyNotifications: NotificationType[] = [
  {
    id: '1',
    title: 'Nouvelle réservation',
    message: 'La chambre 201 a été réservée pour le 15/03/2023',
    time: '1 heure',
    isRead: false,
    type: 'info'
  },
  {
    id: '2',
    title: 'Maintenance terminée',
    message: 'La maintenance de la chambre 501 est terminée',
    time: '3 heures',
    isRead: false,
    type: 'success'
  },
  {
    id: '3',
    title: 'Paiement en attente',
    message: 'Le paiement pour la réservation #1234 est en attente',
    time: '6 heures',
    isRead: true,
    type: 'warning'
  }
];

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout
      title="Tableau de Bord"
      user={dummyUser}
      notifications={dummyNotifications}
    >
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-primary to-blue-700 rounded-xl shadow-md mb-8 overflow-hidden">
        <div className="p-6">
          <h2 className="text-white text-2xl font-bold flex items-center">
            <i className="fas fa-tachometer-alt mr-3 text-yellow-300"></i>
            Tableau de Bord
          </h2>
          <p className="text-blue-100 mt-1">
            Bienvenue Thomas, voici une vue d'ensemble de l'hôtel LuxStay
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <i className="fas fa-calendar-check text-primary text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Réservations aujourd'hui</p>
              <h4 className="text-2xl font-semibold">8</h4>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <i className="fas fa-bed text-green-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Taux d'occupation</p>
              <h4 className="text-2xl font-semibold">78%</h4>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <i className="fas fa-users text-purple-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Clients enregistrés</p>
              <h4 className="text-2xl font-semibold">12</h4>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <i className="fas fa-euro-sign text-yellow-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Chiffre du jour</p>
              <h4 className="text-2xl font-semibold">3,248€</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <i className="fas fa-bolt text-yellow-500 mr-2"></i>
          Actions Rapides
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link to="/admin/bookings" className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors duration-200 group">
            <div className="bg-blue-100 group-hover:bg-blue-200 p-3 rounded-full mb-3 transition-colors duration-200">
              <i className="fas fa-calendar-plus text-primary text-xl"></i>
            </div>
            <span className="text-gray-800 font-medium">Nouvelle Réservation</span>
          </Link>
          
          <Link to="/admin/rooms" className="flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 p-4 rounded-lg transition-colors duration-200 group">
            <div className="bg-green-100 group-hover:bg-green-200 p-3 rounded-full mb-3 transition-colors duration-200">
              <i className="fas fa-door-open text-green-600 text-xl"></i>
            </div>
            <span className="text-gray-800 font-medium">Gérer les Chambres</span>
          </Link>
          
          <Link to="/admin/clients" className="flex flex-col items-center justify-center bg-purple-50 hover:bg-purple-100 p-4 rounded-lg transition-colors duration-200 group">
            <div className="bg-purple-100 group-hover:bg-purple-200 p-3 rounded-full mb-3 transition-colors duration-200">
              <i className="fas fa-user-plus text-purple-600 text-xl"></i>
            </div>
            <span className="text-gray-800 font-medium">Ajouter un Client</span>
          </Link>
          
          <Link to="/admin/reports" className="flex flex-col items-center justify-center bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg transition-colors duration-200 group">
            <div className="bg-yellow-100 group-hover:bg-yellow-200 p-3 rounded-full mb-3 transition-colors duration-200">
              <i className="fas fa-chart-bar text-yellow-600 text-xl"></i>
            </div>
            <span className="text-gray-800 font-medium">Voir les Rapports</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity and Today's Bookings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <i className="fas fa-history text-primary mr-2"></i>
            Activité Récente
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <i className="fas fa-check-circle text-blue-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium">Chambre 302 nettoyée et prête</p>
                <p className="text-xs text-gray-500">Il y a 15 minutes</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <i className="fas fa-user-check text-green-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium">Check-in: Sophie Martin</p>
                <p className="text-xs text-gray-500">Il y a 42 minutes</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <i className="fas fa-credit-card text-yellow-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium">Paiement reçu: 594€</p>
                <p className="text-xs text-gray-500">Il y a 1 heure</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <i className="fas fa-exclamation-circle text-red-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium">Maintenance: Chambre 401</p>
                <p className="text-xs text-gray-500">Il y a 3 heures</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <i className="fas fa-calendar-check text-purple-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium">Nouvelle réservation: #RES-2025-1239</p>
                <p className="text-xs text-gray-500">Il y a 5 heures</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <button className="text-primary hover:text-blue-700 text-sm font-medium transition-colors duration-150">
              Voir toutes les activités
            </button>
          </div>
        </div>
        
        {/* Today's Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <i className="fas fa-calendar-day text-primary mr-2"></i>
            Réservations du Jour
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-3" src="https://randomuser.me/api/portraits/women/12.jpg" alt="Client" />
                <div>
                  <p className="font-medium">Sophie Martin</p>
                  <p className="text-xs text-gray-500">Check-in: 14:00 • Suite Deluxe</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Confirmée</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-3" src="https://randomuser.me/api/portraits/men/45.jpg" alt="Client" />
                <div>
                  <p className="font-medium">Pierre Dupont</p>
                  <p className="text-xs text-gray-500">Check-out: 12:00 • Chambre Standard</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Check-out</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-3" src="https://randomuser.me/api/portraits/women/22.jpg" alt="Client" />
                <div>
                  <p className="font-medium">Camille Bernard</p>
                  <p className="text-xs text-gray-500">Check-in: 15:00 • Chambre Deluxe</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Confirmée</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-3" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Client" />
                <div>
                  <p className="font-medium">Thomas Dubois</p>
                  <p className="text-xs text-gray-500">Check-in: 16:30 • Suite</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Confirmée</span>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/admin/bookings" className="text-primary hover:text-blue-700 text-sm font-medium transition-colors duration-150">
              Voir toutes les réservations
            </Link>
          </div>
        </div>
      </div>
      
      {/* Room Status Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <i className="fas fa-door-open text-primary mr-2"></i>
            État des Chambres
          </h3>
          
          <Link to="/admin/rooms" className="text-primary hover:text-blue-700 text-sm font-medium transition-colors duration-150 mt-2 md:mt-0">
            Gérer les chambres
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="flex flex-col items-center justify-center bg-green-50 p-4 rounded-lg">
            <div className="text-green-600 text-xl mb-1">
              <i className="fas fa-check-circle"></i>
            </div>
            <span className="text-sm font-medium">Disponibles</span>
            <span className="text-lg font-bold text-green-600">12</span>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-blue-50 p-4 rounded-lg">
            <div className="text-blue-600 text-xl mb-1">
              <i className="fas fa-user"></i>
            </div>
            <span className="text-sm font-medium">Occupées</span>
            <span className="text-lg font-bold text-blue-600">22</span>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-yellow-50 p-4 rounded-lg">
            <div className="text-yellow-600 text-xl mb-1">
              <i className="fas fa-broom"></i>
            </div>
            <span className="text-sm font-medium">En nettoyage</span>
            <span className="text-lg font-bold text-yellow-600">8</span>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-red-50 p-4 rounded-lg">
            <div className="text-red-600 text-xl mb-1">
              <i className="fas fa-tools"></i>
            </div>
            <span className="text-sm font-medium">En maintenance</span>
            <span className="text-lg font-bold text-red-600">3</span>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-purple-50 p-4 rounded-lg">
            <div className="text-purple-600 text-xl mb-1">
              <i className="fas fa-clock"></i>
            </div>
            <span className="text-sm font-medium">Réservées</span>
            <span className="text-lg font-bold text-purple-600">15</span>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-lg">
            <div className="text-gray-600 text-xl mb-1">
              <i className="fas fa-hotel"></i>
            </div>
            <span className="text-sm font-medium">Total</span>
            <span className="text-lg font-bold text-gray-600">60</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
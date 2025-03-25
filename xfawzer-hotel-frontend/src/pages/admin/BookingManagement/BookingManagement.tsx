import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import BookingFilters from '../../../components/admin/BookingFilters';
import BookingStats from '../../../components/admin/BookingStats';
import BookingTable from '../../../components/admin/BookingTable';
import Pagination from '../../../components/admin/Pagination';
import BookingFormModal from '../../../components/admin/BookingFormModal';
import BookingDetailsModal from '../../../components/admin/BookingDetailsModal';
import CancelBookingModal from '../../../components/admin/CancelBookingModal';
import { 
  Booking, 
  BookingFormData, 
  BookingFiltersType as BookingFiltersType,
  BookingStat
} from '../../../types/booking.types';
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

// Données fictives pour les statistiques
const dummyStats: BookingStat[] = [
  {
    label: 'Réservations totales',
    count: 248,
    icon: 'fas fa-calendar-check text-primary',
    color: 'bg-blue-100'
  },
  {
    label: 'Confirmées',
    count: 182,
    icon: 'fas fa-check-circle text-green-600',
    color: 'bg-green-100'
  },
  {
    label: 'En attente',
    count: 36,
    icon: 'fas fa-clock text-yellow-600',
    color: 'bg-yellow-100'
  },
  {
    label: 'Annulées',
    count: 30,
    icon: 'fas fa-times-circle text-red-600',
    color: 'bg-red-100'
  }
];

// Données fictives pour les réservations
const dummyBookings: Booking[] = [
  {
    id: '1',
    number: '#RES-2025-1234',
    createdAt: '25 Mar 2025',
    client: {
      id: '1',
      firstName: 'Sophie',
      lastName: 'Martin',
      email: 'sophie.m@example.com',
      phone: '+33 6 12 34 56 78',
      avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
      address: 'Paris, France',
      staysCount: 5
    },
    room: {
      id: '1',
      number: '302',
      type: 'Suite Deluxe',
      floor: 3,
      capacity: 2,
      price: 180
    },
    checkIn: {
      date: '25 Mar 2025',
      time: '14:00'
    },
    checkOut: {
      date: '28 Mar 2025',
      time: '12:00'
    },
    nightsCount: 3,
    adultsCount: 2,
    childrenCount: 0,
    status: 'confirmed',
    payment: {
      amount: 540,
      tax: 54,
      total: 594,
      method: 'Visa ****4567',
      status: 'paid'
    },
    specialRequests: 'Chambre avec vue sur le jardin si possible. Lit supplémentaire pour enfant. Allergique aux arachides.',
    history: [
      { date: '25 Mar 2025', action: 'Réservation confirmée' },
      { date: '23 Mar 2025', action: 'Paiement reçu' },
      { date: '21 Mar 2025', action: 'Réservation créée' }
    ]
  },
  {
    id: '2',
    number: '#RES-2025-1235',
    createdAt: '24 Mar 2025',
    client: {
      id: '2',
      firstName: 'Thomas',
      lastName: 'Dubois',
      email: 'thomas.d@example.com',
      phone: '+33 6 98 76 54 32',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    room: {
      id: '2',
      number: '105',
      type: 'Chambre Standard',
      floor: 1,
      capacity: 2,
      price: 120
    },
    checkIn: {
      date: '24 Mar 2025',
      time: '15:30'
    },
    checkOut: {
      date: '26 Mar 2025',
      time: '12:00'
    },
    nightsCount: 2,
    adultsCount: 1,
    childrenCount: 0,
    status: 'checked-in',
    payment: {
      amount: 240,
      tax: 24,
      total: 264,
      method: 'Mastercard ****1234',
      status: 'paid'
    }
  },
  {
    id: '3',
    number: '#RES-2025-1236',
    createdAt: '23 Mar 2025',
    client: {
      id: '3',
      firstName: 'Marie',
      lastName: 'Leroy',
      email: 'marie.l@example.com',
      phone: '+33 6 23 45 67 89',
      avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    room: {
      id: '3',
      number: '501',
      type: 'Suite Présidentielle',
      floor: 5,
      capacity: 4,
      price: 450
    },
    checkIn: {
      date: '26 Mar 2025',
      time: '14:00'
    },
    checkOut: {
      date: '30 Mar 2025',
      time: '12:00'
    },
    nightsCount: 4,
    adultsCount: 2,
    childrenCount: 0,
    status: 'pending',
    payment: {
      amount: 1800,
      tax: 180,
      total: 1980,
      method: 'En attente',
      status: 'pending'
    },
    specialRequests: 'Champagne à l\'arrivée. Réservation au restaurant pour le 27 Mars.'
  },
  {
    id: '4',
    number: '#RES-2025-1237',
    createdAt: '22 Mar 2025',
    client: {
      id: '4',
      firstName: 'Pierre',
      lastName: 'Dupont',
      email: 'pierre.d@example.com',
      phone: '+33 6 34 56 78 90',
      avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    room: {
      id: '4',
      number: '205',
      type: 'Chambre Familiale',
      floor: 2,
      capacity: 4,
      price: 160
    },
    checkIn: {
      date: '27 Mar 2025',
      time: '14:00'
    },
    checkOut: {
      date: '02 Avr 2025',
      time: '12:00'
    },
    nightsCount: 6,
    adultsCount: 2,
    childrenCount: 2,
    status: 'cancelled',
    payment: {
      amount: 960,
      tax: 96,
      total: 1056,
      method: 'Visa ****7890',
      status: 'refunded'
    },
    history: [
      { date: '22 Mar 2025', action: 'Réservation annulée' },
      { date: '21 Mar 2025', action: 'Paiement reçu' },
      { date: '20 Mar 2025', action: 'Réservation créée' }
    ]
  },
  {
    id: '5',
    number: '#RES-2025-1238',
    createdAt: '21 Mar 2025',
    client: {
      id: '5',
      firstName: 'Camille',
      lastName: 'Bernard',
      email: 'camille.b@example.com',
      phone: '+33 6 45 67 89 01',
      avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg'
    },
    room: {
      id: '5',
      number: '304',
      type: 'Chambre Deluxe',
      floor: 3,
      capacity: 2,
      price: 180
    },
    checkIn: {
      date: '25 Mar 2025',
      time: '14:00'
    },
    checkOut: {
      date: '29 Mar 2025',
      time: '12:00'
    },
    nightsCount: 4,
    adultsCount: 2,
    childrenCount: 0,
    status: 'confirmed',
    payment: {
      amount: 720,
      tax: 72,
      total: 792,
      method: 'PayPal',
      status: 'paid'
    }
  }
];

const BookingManagement: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<BookingFiltersType>({
    dateRange: '',
    status: '',
    roomType: '',
    searchQuery: ''
  });
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(dummyBookings);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  // États pour les modals
  const [isBookingFormModalOpen, setIsBookingFormModalOpen] = useState(false);
  const [isBookingDetailsModalOpen, setIsBookingDetailsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | undefined>(undefined);
  const [bookingToCancel, setBookingToCancel] = useState<string | undefined>(undefined);

  // Appliquer les filtres
  useEffect(() => {
    let result = dummyBookings;
    
    // La fonction filterBookings n'est pas appelée initialement, seulement quand on clique sur "Appliquer"
    
    setFilteredBookings(result);
    setCurrentPage(1); // Réinitialiser à la première page quand les filtres changent
  }, []);
  
  // Appliquer les filtres quand l'utilisateur clique sur le bouton "Filtrer"
  const applyFilters = () => {
    let result = dummyBookings;

    // Appliquer le filtre de statut
    if (filters.status) {
      result = result.filter(booking => booking.status === filters.status);
    }
    
    // Appliquer le filtre de type de chambre
    if (filters.roomType) {
      result = result.filter(booking => booking.room.type.toLowerCase().includes(filters.roomType.toLowerCase()));
    }
    
    // Appliquer la recherche
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(booking => 
        booking.number.toLowerCase().includes(query) || 
        `${booking.client.firstName} ${booking.client.lastName}`.toLowerCase().includes(query) ||
        booking.client.email.toLowerCase().includes(query)
      );
    }
    
    setFilteredBookings(result);
    setCurrentPage(1); // Réinitialiser à la première page
  };
  
  // Réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      dateRange: '',
      status: '',
      roomType: '',
      searchQuery: ''
    });
    setFilteredBookings(dummyBookings);
    setCurrentPage(1);
  };
  
  // Gestionnaire pour le changement de filtre
  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Gestionnaire pour la recherche
  const handleSearch = (query: string) => {
    setFilters((prev: any) => ({
      ...prev,
      searchQuery: query
    }));
  };
  
  // Calcul de la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  
  // Gestionnaire pour le changement de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Gestionnaires pour les actions sur les réservations
  const handleAddBooking = () => {
    setCurrentBooking(undefined);
    setIsBookingFormModalOpen(true);
  };
  
  const handleViewBooking = (bookingId: string) => {
    const booking = dummyBookings.find(b => b.id === bookingId);
    if (booking) {
      setCurrentBooking(booking);
      setIsBookingDetailsModalOpen(true);
    }
  };
  
  const handleEditBooking = (bookingId: string) => {
    const booking = dummyBookings.find(b => b.id === bookingId);
    if (booking) {
      setCurrentBooking(booking);
      setIsBookingFormModalOpen(true);
    }
  };
  
  const handleCancelBooking = (bookingId: string) => {
    setBookingToCancel(bookingId);
    setIsCancelModalOpen(true);
  };
  
  const handleBookingFormSubmit = (formData: BookingFormData) => {
    // En réalité, envoyer les données à l'API
    console.log('Booking form submitted:', formData);
    
    // Simuler une mise à jour réussie
    if (currentBooking) {
      console.log(`Réservation ${currentBooking.number} mise à jour`);
    } else {
      console.log('Nouvelle réservation ajoutée');
    }
    
    setIsBookingFormModalOpen(false);
  };
  
  const handleConfirmCancel = (bookingId: string, reason: string) => {
    // En réalité, envoyer une demande d'annulation à l'API
    console.log(`Annulation de la réservation ${bookingId} pour raison: ${reason}`);
    
    // Simuler une annulation réussie
    setIsCancelModalOpen(false);
    
    // Trouver et mettre à jour la réservation annulée dans la liste
    const updatedBookings = filteredBookings.map(booking => {
      if (booking.id === bookingId) {
        return { ...booking, status: 'cancelled' as const };
      }
      return booking;
    });
    
    setFilteredBookings(updatedBookings);
  };

  return (
    <AdminLayout
      title="Gestion des Réservations"
      user={dummyUser}
      notifications={dummyNotifications}
      onSearch={handleSearch}
    >
      {/* Booking Management Header */}
      <div className="bg-gradient-to-r from-primary to-blue-700 rounded-xl shadow-md mb-8 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-white text-2xl font-bold flex items-center">
              <i className="fas fa-calendar-check mr-3 text-yellow-300"></i>
              Gestion des Réservations
            </h2>
            <p className="text-blue-100 mt-1 max-w-xl">
              Gérez et supervisez toutes les réservations de l'hôtel
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="bg-white text-primary px-4 py-3 rounded-lg shadow hover:shadow-lg transition-all duration-200 font-medium"
              onClick={handleAddBooking}
            >
              <i className="fas fa-plus mr-2"></i> Nouvelle Réservation
            </button>
            <button 
              className="bg-blue-800 bg-opacity-50 text-white px-4 py-3 rounded-lg border border-blue-400 border-opacity-30 hover:bg-opacity-70 transition-all duration-200"
              onClick={() => navigate('/admin/reports')}
            >
              <i className="fas fa-chart-line mr-2"></i> Rapports
            </button>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <BookingFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onReset={resetFilters}
        onApplyFilters={applyFilters}
      />
      
      {/* Booking Stats */}
      <BookingStats stats={dummyStats} />
      
      {/* Bookings Table */}
      <BookingTable 
        bookings={currentItems}
        onView={handleViewBooking}
        onEdit={handleEditBooking}
        onCancel={handleCancelBooking}
      />
      
      {/* Pagination */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredBookings.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        viewMode="list"
      />
      
      {/* Modals */}
      <BookingFormModal 
        isOpen={isBookingFormModalOpen}
        onClose={() => setIsBookingFormModalOpen(false)}
        onSubmit={handleBookingFormSubmit}
        bookingData={currentBooking}
      />
      
      <BookingDetailsModal 
        isOpen={isBookingDetailsModalOpen}
        onClose={() => setIsBookingDetailsModalOpen(false)}
        booking={currentBooking}
      />
      
      <CancelBookingModal 
        isOpen={isCancelModalOpen}
        bookingId={bookingToCancel}
        bookingNumber={dummyBookings.find(b => b.id === bookingToCancel)?.number}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
      />
    </AdminLayout>
  );
};

export default BookingManagement;
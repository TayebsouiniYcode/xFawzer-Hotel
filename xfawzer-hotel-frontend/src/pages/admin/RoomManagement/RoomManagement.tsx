import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import RoomFilters from '../../../components/admin/RoomFilters';
import ViewToggle, { ViewMode } from '../../../components/admin/ViewToggle';
import RoomTable from '../../../components/admin/RoomTable';
import RoomCard from '../../../components/admin/RoomCard';
import Pagination from '../../../components/admin/Pagination';
import RoomFormModal from '../../../components/admin/RoomFormModal';
import DeleteConfirmationModal from '../../../components/admin/DeleteConfirmationModal';
import { RoomDetails, FilterOptions, RoomFormData, AdminUser, NotificationType } from '../../../types/admin.types';

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

// Donnée fictives pour les chambres
const dummyRooms: RoomDetails[] = [
  {
    id: '1',
    number: '101',
    floor: 1,
    type: 'standard',
    status: 'available',
    capacity: 2,
    price: 120,
    bedConfiguration: '1-double',
    bedConfigurationText: '1 lit double',
    view: 'city',
    amenities: ['wifi', 'tv', 'ac'],
    description: 'Chambre standard confortable avec tous les équipements essentiels',
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    number: '102',
    floor: 1,
    type: 'standard',
    status: 'occupied',
    capacity: 2,
    price: 120,
    bedConfiguration: '2-single',
    bedConfigurationText: '2 lits simples',
    view: 'city',
    amenities: ['wifi', 'tv', 'ac'],
    description: 'Chambre standard avec deux lits simples',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    number: '201',
    floor: 2,
    type: 'deluxe',
    status: 'cleaning',
    capacity: 2,
    price: 180,
    bedConfiguration: '1-king',
    bedConfigurationText: '1 lit king-size',
    view: 'pool',
    amenities: ['wifi', 'tv', 'ac', 'minibar', 'safe'],
    description: 'Chambre deluxe avec un grand lit king-size et vue sur la piscine'
  },
  {
    id: '4',
    number: '301',
    floor: 3,
    type: 'suite',
    status: 'available',
    capacity: 4,
    price: 250,
    bedConfiguration: '1-king-1-sofa',
    bedConfigurationText: '1 lit king-size + 1 canapé-lit',
    view: 'sea',
    amenities: ['wifi', 'tv', 'ac', 'minibar', 'safe', 'jacuzzi'],
    description: 'Suite spacieuse avec un lit king-size, un salon et vue sur la mer'
  },
  {
    id: '5',
    number: '501',
    floor: 5,
    type: 'presidential',
    status: 'maintenance',
    capacity: 6,
    price: 450,
    bedConfiguration: '2-king',
    bedConfigurationText: '2 lits king-size + salon',
    view: 'mountain',
    amenities: ['wifi', 'tv', 'ac', 'minibar', 'safe', 'jacuzzi', 'balcony', 'bathtub'],
    description: 'Suite présidentielle luxueuse avec deux chambres, salon et vue panoramique'
  }
];

const RoomManagement: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [filters, setFilters] = useState<FilterOptions>({
    roomType: '',
    roomStatus: '',
    floor: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRooms, setFilteredRooms] = useState<RoomDetails[]>(dummyRooms);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  // États pour les modals
  const [isRoomFormModalOpen, setIsRoomFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<RoomDetails | undefined>(undefined);
  const [roomToDelete, setRoomToDelete] = useState<string | undefined>(undefined);
  
  // Appliquer les filtres et la recherche
  useEffect(() => {
    let result = dummyRooms;
    
    // Appliquer les filtres
    if (filters.roomType) {
      result = result.filter(room => room.type === filters.roomType);
    }
    
    if (filters.roomStatus) {
      result = result.filter(room => room.status === filters.roomStatus);
    }
    
    if (filters.floor) {
      result = result.filter(room => room.floor.toString() === filters.floor);
    }
    
    // Appliquer la recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(room => 
        room.number.toLowerCase().includes(query) || 
        room.type.toLowerCase().includes(query) ||
        room.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredRooms(result);
    setCurrentPage(1); // Réinitialiser à la première page quand les filtres changent
  }, [filters, searchQuery]);
  
  // Calcul de la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRooms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  
  // Gestionnaires d'événements
  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Gestionnaires pour les actions sur les chambres
  const handleAddRoom = () => {
    setCurrentRoom(undefined);
    setIsRoomFormModalOpen(true);
  };
  
  const handleViewRoom = (roomId: string) => {
    // En réalité, vous pourriez naviguer vers une page de détails
    console.log(`Voir la chambre ${roomId}`);
  };
  
  const handleEditRoom = (roomId: string) => {
    const room = dummyRooms.find(r => r.id === roomId);
    if (room) {
      setCurrentRoom(room);
      setIsRoomFormModalOpen(true);
    }
  };
  
  const handleDeleteRoom = (roomId: string) => {
    setRoomToDelete(roomId);
    setIsDeleteModalOpen(true);
  };
  
  const handleRoomFormSubmit = (formData: RoomFormData) => {
    // En réalité, envoyer les données à l'API
    console.log('Room form submitted:', formData);
    
    // Simuler une mise à jour réussie
    if (currentRoom) {
      console.log(`Chambre ${currentRoom.number} mise à jour`);
    } else {
      console.log('Nouvelle chambre ajoutée');
    }
    
    setIsRoomFormModalOpen(false);
  };
  
  const handleDeleteConfirm = (roomId: string) => {
    // En réalité, envoyer une demande de suppression à l'API
    console.log(`Suppression de la chambre ${roomId}`);
    
    // Simuler une suppression réussie
    setIsDeleteModalOpen(false);
  };
  
  // Rendre la page
  return (
    <AdminLayout
      title="Gestion des Chambres"
      user={dummyUser}
      notifications={dummyNotifications}
      onSearch={handleSearch}
    >
      {/* Room Management Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h3 className="text-gray-700 text-lg font-semibold">Gestion des Chambres</h3>
          <p className="text-gray-500">Gérez toutes les chambres de l'hôtel</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-900 transition"
            onClick={handleAddRoom}
          >
            <i className="fas fa-plus mr-2"></i> Ajouter une Chambre
          </button>
        </div>
      </div>
      
      {/* Filters and View Toggle */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <RoomFilters 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
          <ViewToggle 
            viewMode={viewMode} 
            onViewChange={handleViewModeChange} 
          />
        </div>
      </div>
      
      {/* Room List View */}
      {viewMode === 'list' && (
        <>
          <RoomTable 
            rooms={currentItems}
            onView={handleViewRoom}
            onEdit={handleEditRoom}
            onDelete={handleDeleteRoom}
          />
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredRooms.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            viewMode={viewMode}
          />
        </>
      )}
      
      {/* Room Grid View */}
      {viewMode === 'grid' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map(room => (
              <RoomCard 
                key={room.id}
                room={room}
                onView={handleViewRoom}
                onEdit={handleEditRoom}
                onDelete={handleDeleteRoom}
              />
            ))}
          </div>
          <div className="mt-6">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredRooms.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              viewMode={viewMode}
            />
          </div>
        </>
      )}
      
      {/* Room Form Modal */}
      <RoomFormModal 
        isOpen={isRoomFormModalOpen}
        onClose={() => setIsRoomFormModalOpen(false)}
        onSubmit={handleRoomFormSubmit}
        roomData={currentRoom}
      />
      
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        itemId={roomToDelete}
        itemName={`la chambre ${dummyRooms.find(r => r.id === roomToDelete)?.number}`}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </AdminLayout>
  );
};

export default RoomManagement;
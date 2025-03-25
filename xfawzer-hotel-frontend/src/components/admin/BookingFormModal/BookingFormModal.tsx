import React, { useState, useEffect } from 'react';
import { BookingFormData, Booking, BookingStatus } from '../../../types/booking.types';

export interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: BookingFormData) => void;
  bookingData?: Booking;
}

const BookingFormModal: React.FC<BookingFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  bookingData
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    roomType: '',
    roomNumber: '',
    checkInDate: '',
    checkOutDate: '',
    adults: 2,
    children: 0,
    status: 'pending',
    specialRequests: ''
  });
  
  const [isNewClient, setIsNewClient] = useState(true);
  const [clientSearch, setClientSearch] = useState('');
  
  // Initialize form with booking data if provided
  useEffect(() => {
    if (bookingData) {
      setFormData({
        clientId: bookingData.client.id,
        firstName: bookingData.client.firstName,
        lastName: bookingData.client.lastName,
        email: bookingData.client.email,
        phone: bookingData.client.phone || '',
        roomType: bookingData.room.type,
        roomNumber: bookingData.room.number,
        checkInDate: bookingData.checkIn.date,
        checkOutDate: bookingData.checkOut.date,
        adults: bookingData.adultsCount,
        children: bookingData.childrenCount,
        status: bookingData.status,
        specialRequests: bookingData.specialRequests || ''
      });
      setIsNewClient(false);
    } else {
      // Reset form for new booking
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        roomType: '',
        roomNumber: '',
        checkInDate: '',
        checkOutDate: '',
        adults: 2,
        children: 0,
        status: 'pending',
        specialRequests: ''
      });
      setIsNewClient(true);
    }
    setClientSearch('');
  }, [bookingData, isOpen]);
  
  if (!isOpen) return null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleClientSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientSearch(e.target.value);
  };
  
  const handleNewClientClick = () => {
    setIsNewClient(true);
    setFormData({
      ...formData,
      clientId: undefined,
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold">
            {bookingData ? `Modifier la Réservation ${bookingData.number}` : 'Nouvelle Réservation'}
          </h3>
          <button 
            className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
            onClick={onClose}
            aria-label="Fermer"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="p-6">
          <form id="booking-form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Client Information */}
              <div>
                <h4 className="text-md font-semibold mb-4 flex items-center">
                  <i className="fas fa-user text-primary mr-2"></i>
                  Informations Client
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="client-search" className="block text-sm font-medium text-gray-700 mb-1">Rechercher un client existant</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        id="client-search" 
                        value={clientSearch}
                        onChange={handleClientSearchChange}
                        disabled={!isNewClient && !!bookingData}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 pl-10" 
                        placeholder="Nom, email ou téléphone"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-search text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">ou</span>
                    <div className="flex-grow border-t border-gray-300 mx-4"></div>
                    <button 
                      type="button" 
                      className="text-primary text-sm hover:underline"
                      onClick={handleNewClientClick}
                    >
                      Nouveau client
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    />
                  </div>
                </div>
              </div>
              
              {/* Booking Details */}
              <div>
                <h4 className="text-md font-semibold mb-4 flex items-center">
                  <i className="fas fa-calendar-check text-primary mr-2"></i>
                  Détails de la Réservation
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">Type de Chambre</label>
                    <select 
                      id="roomType" 
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      required
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="Standard">Standard</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Suite">Suite</option>
                      <option value="Familiale">Familiale</option>
                      <option value="Présidentielle">Présidentielle</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700 mb-1">Numéro de Chambre</label>
                    <select 
                      id="roomNumber" 
                      name="roomNumber"
                      value={formData.roomNumber}
                      onChange={handleChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      required
                    >
                      <option value="">Sélectionner une chambre</option>
                      <option value="101">101 - Standard</option>
                      <option value="102">102 - Standard</option>
                      <option value="201">201 - Deluxe</option>
                      <option value="301">301 - Suite</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-1">Date d'arrivée</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          id="checkInDate" 
                          name="checkInDate"
                          value={formData.checkInDate}
                          onChange={handleChange}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 pl-10"
                          required
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i className="fas fa-calendar-alt text-gray-400"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-1">Date de départ</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          id="checkOutDate" 
                          name="checkOutDate"
                          value={formData.checkOutDate}
                          onChange={handleChange}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 pl-10"
                          required
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i className="fas fa-calendar-alt text-gray-400"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">Adultes</label>
                      <input 
                        type="number" 
                        id="adults" 
                        name="adults"
                        min="1" 
                        max="10" 
                        value={formData.adults}
                        onChange={handleChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">Enfants</label>
                      <input 
                        type="number" 
                        id="children" 
                        name="children"
                        min="0" 
                        max="10" 
                        value={formData.children}
                        onChange={handleChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                    <select 
                      id="status" 
                      name="status"
                      value={formData.status}
                      onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      required
                    >
                      <option value="pending">En attente</option>
                      <option value="confirmed">Confirmée</option>
                      <option value="checked-in">Enregistrée</option>
                      <option value="checked-out">Terminée</option>
                      <option value="cancelled">Annulée</option>
                      <option value="no-show">Non présentée</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">Demandes spéciales</label>
                    <textarea 
                      id="specialRequests" 
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={3} 
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <button 
                type="button" 
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                onClick={onClose}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="bg-primary text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 transition-colors duration-150"
              >
                {bookingData ? 'Enregistrer les modifications' : 'Créer la réservation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingFormModal;
import React, { useState, useEffect } from 'react';
import { BookingFiltersType } from '../../../types/booking.types';

export interface BookingFiltersProps {
  filters: BookingFiltersType;
  onFilterChange: (name: string, value: string) => void;
  onSearch: (query: string) => void;
  onReset: () => void;
  onApplyFilters: () => void;
}

const BookingFilters: React.FC<BookingFiltersProps> = ({
  filters,
  onFilterChange,
  onSearch,
  onReset,
  onApplyFilters
}) => {
  const [searchInput, setSearchInput] = useState(filters.searchQuery);
  
  // Update search input when filters.searchQuery changes
  useEffect(() => {
    setSearchInput(filters.searchQuery);
  }, [filters.searchQuery]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-all duration-300">
      <div className="flex flex-col space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          <i className="fas fa-filter text-primary mr-2"></i>
          Filtres de recherche
        </h3>
        
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            {/* Date Range Filter */}
            <div className="flex-1">
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Période</label>
              <div className="relative group">
                <input 
                  type="text" 
                  id="dateRange" 
                  name="dateRange"
                  value={filters.dateRange}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 bg-gray-50 focus:bg-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-30 pl-10 py-2.5 transition-colors duration-200" 
                  placeholder="Sélectionner une période"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 text-opacity-70 group-focus-within:text-opacity-100 transition-colors duration-200">
                  <i className="fas fa-calendar-alt"></i>
                </div>
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="flex-1">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <div className="relative group">
                <select 
                  id="status" 
                  name="status"
                  value={filters.status}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 bg-gray-50 focus:bg-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-30 pl-10 py-2.5 transition-colors duration-200"
                >
                  <option value="">Tous les statuts</option>
                  <option value="confirmed">Confirmée</option>
                  <option value="pending">En attente</option>
                  <option value="checked-in">Enregistrée</option>
                  <option value="checked-out">Terminée</option>
                  <option value="cancelled">Annulée</option>
                  <option value="no-show">Non présentée</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500 text-opacity-70 group-focus-within:text-opacity-100 transition-colors duration-200">
                  <i className="fas fa-tag"></i>
                </div>
              </div>
            </div>
            
            {/* Room Type Filter */}
            <div className="flex-1">
              <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">Type de Chambre</label>
              <div className="relative group">
                <select 
                  id="roomType" 
                  name="roomType"
                  value={filters.roomType}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 bg-gray-50 focus:bg-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-30 pl-10 py-2.5 transition-colors duration-200"
                >
                  <option value="">Tous les types</option>
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                  <option value="family">Familiale</option>
                  <option value="presidential">Présidentielle</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 text-opacity-70 group-focus-within:text-opacity-100 transition-colors duration-200">
                  <i className="fas fa-bed"></i>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4 space-y-4 md:space-y-0">
            {/* Advanced Search */}
            <div className="flex-1">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative group">
                  <input 
                    type="text" 
                    value={searchInput}
                    onChange={handleSearchChange}
                    className="w-full rounded-md border-gray-300 bg-gray-50 focus:bg-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-30 pl-10 py-2.5 transition-colors duration-200" 
                    placeholder="Rechercher par nom, email, n° de réservation..."
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 text-opacity-70 group-focus-within:text-opacity-100 transition-colors duration-200">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
              </form>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex space-x-3">
              <button 
                onClick={onApplyFilters}
                className="flex-none bg-primary text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition shadow-sm flex items-center"
              >
                <i className="fas fa-filter mr-2"></i> Appliquer
              </button>
              <button 
                onClick={onReset}
                className="flex-none bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-md hover:bg-gray-50 transition shadow-sm flex items-center"
              >
                <i className="fas fa-redo-alt mr-2"></i> Réinitialiser
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;
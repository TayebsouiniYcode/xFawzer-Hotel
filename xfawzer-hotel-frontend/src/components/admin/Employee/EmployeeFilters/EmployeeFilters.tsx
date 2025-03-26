import React from 'react';
import IconInput from '../../../common/IconInput';

export interface EmployeeFiltersProps {
  departmentFilter: string;
  setDepartmentFilter: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
  departmentFilter,
  setDepartmentFilter,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        {/* Department Filter */}
        <div className="flex-1">
          <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-1">Département</label>
          <select 
            id="department-filter" 
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">Tous les départements</option>
            <option value="reception">Réception</option>
            <option value="housekeeping">Entretien</option>
            <option value="restaurant">Restaurant</option>
            <option value="management">Direction</option>
            <option value="maintenance">Maintenance</option>
            <option value="security">Sécurité</option>
          </select>
        </div>
        
        {/* Role Filter */}
        <div className="flex-1">
          <label htmlFor="role-filter" className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
          <select 
            id="role-filter" 
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">Tous les postes</option>
            <option value="manager">Manager</option>
            <option value="receptionist">Réceptionniste</option>
            <option value="housekeeper">Femme de chambre</option>
            <option value="chef">Chef cuisinier</option>
            <option value="waiter">Serveur</option>
            <option value="technician">Technicien</option>
            <option value="security">Agent de sécurité</option>
          </select>
        </div>
        
        {/* Status Filter */}
        <div className="flex-1">
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
          <select 
            id="status-filter" 
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="on-leave">En congé</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
        
        {/* Search */}
        <div className="flex-1">
          <label htmlFor="employee-search" className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
          <IconInput
            id="employee-search"
            icon="fas fa-search"
            placeholder="Nom, email, téléphone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeFilters;
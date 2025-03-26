import React, { useState } from 'react';
import { Employee } from '../../../../types/employee';
import StatusBadge from '../../StatusBadge';
import Pagination from '../../Pagination';


export interface EmployeeTableProps {
  employees: Employee[];
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ 
  employees, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Pagination logic
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  
  // Format date to DD MMM YYYY
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  // Get department label
  const getDepartmentLabel = (department: string) => {
    const departments: { [key: string]: string } = {
      'reception': 'Réception',
      'housekeeping': 'Entretien',
      'restaurant': 'Restaurant',
      'management': 'Direction',
      'maintenance': 'Maintenance',
      'security': 'Sécurité'
    };
    
    return departments[department] || department;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employé
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Poste
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Département
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date d'embauche
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={employee.profileImage} alt={`${employee.firstName} ${employee.lastName}`} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{employee.firstName} {employee.lastName}</div>
                      <div className="text-xs text-gray-500">ID: {employee.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {getDepartmentLabel(employee.department)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.email}</div>
                  <div className="text-xs text-gray-500">{employee.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(employee.hireDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={'maintenance'}                    // status={'actif'}
                    // status={employee.status} 
                    // statusLabels={{
                    //   active: 'Actif',
                    //   'on-leave': 'En congé',
                    //   inactive: 'Inactif'
                    // }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-900" 
                      title="Voir détails"
                      onClick={() => onView(employee)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      className="text-yellow-600 hover:text-yellow-900" 
                      title="Modifier"
                      onClick={() => onEdit(employee)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    {employee.status !== 'inactive' ? (
                      <button 
                        className="text-red-600 hover:text-red-900" 
                        title="Désactiver"
                        onClick={() => onDelete(employee)}
                      >
                        <i className="fas fa-user-slash"></i>
                      </button>
                    ) : (
                      <button 
                        className="text-green-600 hover:text-green-900" 
                        title="Activer"
                        onClick={() => onEdit(employee)}
                      >
                        <i className="fas fa-user-check"></i>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={employees.length}
        itemsPerPage={itemsPerPage} viewMode={'list'}      />
    </div>
  );
};

export default EmployeeTable;
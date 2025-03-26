import React, { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import DeleteConfirmationModal from '../../../components/admin/DeleteConfirmationModal';
import Button from '../../../components/common/Button';
import { Employee } from '../../../types/employee';
import EmployeeTable from '../../../components/admin/Employee/EmployeeTable';
import EmployeeStats from '../../../components/admin/Employee/EmployeeStats';
import EmployeeFormModal from '../../../components/admin/Employee/EmployeeFormModal';
import EmployeeDetailsModal from '../../../components/admin/Employee/EmployeeDetailsModal';
import { AdminUser, NotificationType } from '../../../types/admin.types';
import EmployeeFilters from '../../../components/admin/Employee/EmployeeFilters';

const EmployeeManagement: React.FC = () => {
  // States for modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // States for filters
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  // Dummy data for employees
  const employees: Employee[] = [
    {
      id: 'EMP-001',
      firstName: 'Isabelle',
      lastName: 'Laurent',
      email: 'isabelle.l@luxstay.com',
      phone: '+33 6 12 34 56 78',
      position: 'Directrice Générale',
      department: 'management',
      hireDate: '2020-01-15',
      status: 'active',
      profileImage: 'https://randomuser.me/api/portraits/women/42.jpg',
    },
    {
      id: 'EMP-002',
      firstName: 'Thomas',
      lastName: 'Dubois',
      email: 'thomas.d@luxstay.com',
      phone: '+33 6 23 45 67 89',
      position: 'Directeur Adjoint',
      department: 'management',
      hireDate: '2020-03-03',
      status: 'active',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 'EMP-003',
      firstName: 'Marie',
      lastName: 'Leroy',
      email: 'marie.l@luxstay.com',
      phone: '+33 6 34 56 78 90',
      position: 'Responsable Réception',
      department: 'reception',
      hireDate: '2020-06-12',
      status: 'on-leave',
      profileImage: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      id: 'EMP-004',
      firstName: 'Pierre',
      lastName: 'Dupont',
      email: 'pierre.d@luxstay.com',
      phone: '+33 6 45 67 89 01',
      position: 'Chef Cuisinier',
      department: 'restaurant',
      hireDate: '2020-09-05',
      status: 'active',
      profileImage: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
      id: 'EMP-005',
      firstName: 'Camille',
      lastName: 'Bernard',
      email: 'camille.b@luxstay.com',
      phone: '+33 6 56 78 90 12',
      position: 'Réceptionniste',
      department: 'reception',
      hireDate: '2020-11-15',
      status: 'inactive',
      profileImage: 'https://randomuser.me/api/portraits/women/22.jpg',
    },
  ];

  // Stats calculation
  const stats = {
    total: employees.length,
    active: employees.filter(emp => emp.status === 'active').length,
    onLeave: employees.filter(emp => emp.status === 'on-leave').length,
    inactive: employees.filter(emp => emp.status === 'inactive').length,
  };

  // Données fictives pour le développement
  const dummyUser: AdminUser = {
    id: '1',
    name: 'Thomas Dubois',
    email: 'thomas.dubois@luxstay.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'admin'
  };

  // Handle actions
  const handleAddEmployee = () => {
    setIsEditing(false);
    setSelectedEmployee(null);
    setIsFormModalOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setIsEditing(true);
    setSelectedEmployee(employee);
    setIsFormModalOpen(true);
  };

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEmployee = (employee: Employee) => {
    // Here would be the API call to save the employee
    console.log('Saving employee:', employee);
    setIsFormModalOpen(false);
  };

  const handleDeactivateEmployee = (reason: string) => {
    if (selectedEmployee) {
      // Here would be the API call to deactivate the employee
      console.log(`Deactivating employee ${selectedEmployee.id} for reason: ${reason}`);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    // <AdminLayout title="Gestion du Personnel" currentPage="employees">
    <AdminLayout 
      title="Gestion du Personnel" 
      user={dummyUser} 
      notifications={dummyNotifications}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h3 className="text-gray-700 text-lg font-semibold">Gestion du Personnel</h3>
          <p className="text-gray-500">Gérez tous les employés de l'hôtel</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={handleAddEmployee}
            className="bg-primary text-white"
            // icon="fas fa-plus"
          >
            Ajouter un Employé
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <EmployeeFilters 
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {/* Employee Stats */}
      <EmployeeStats stats={stats} />
      
      {/* Employees Table */}
      <EmployeeTable 
        employees={employees}
        onView={handleViewEmployee}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />
      
      {/* Modals */}
      <EmployeeFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveEmployee}
        isEditing={isEditing}
        employee={selectedEmployee}
      />
      
      <EmployeeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        employee={selectedEmployee}
      />
      
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeactivateEmployee}
        // title="Désactiver l'employé"
        // message="Êtes-vous sûr de vouloir désactiver cet employé ? Il n'aura plus accès au système."
        // confirmButtonText="Confirmer la désactivation"
        // reasonOptions={[
        //   { value: "resignation", label: "Démission" },
        //   { value: "termination", label: "Licenciement" },
        //   { value: "retirement", label: "Retraite" },
        //   { value: "end-of-contract", label: "Fin de contrat" },
        //   { value: "other", label: "Autre raison" }
        // ]}
      />
    </AdminLayout>
  );
};

export default EmployeeManagement;
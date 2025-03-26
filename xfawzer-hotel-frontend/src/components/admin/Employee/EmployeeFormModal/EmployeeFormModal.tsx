import React, { useState, useEffect } from 'react';
import { Employee } from '../../../../types/employee';
import Input from '../../../common/Input';
import Button from '../../../common/Button';
// import Button from '../../common/Button';
// import Input from '../../common/Input';
// import { Employee } from '../../../types/employee.types';

export interface EmployeeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Employee) => void;
  isEditing: boolean;
  employee: Employee | null;
}

const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  isEditing,
  employee
}) => {
  // Form state
  const [formData, setFormData] = useState<Partial<Employee>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    nationality: '',
    position: '',
    department: 'reception',
    hireDate: '',
    status: 'active',
    manager: '',
    notes: ''
  });

  // Update form data when employee prop changes
  useEffect(() => {
    if (isEditing && employee) {
      setFormData({
        ...employee
      });
    } else {
      // Reset form for new employee
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        birthDate: '',
        nationality: '',
        position: '',
        department: 'reception',
        hireDate: '',
        status: 'active',
        manager: '',
        notes: ''
      });
    }
  }, [isEditing, employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id.replace('employee-', '')]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate an ID if adding a new employee
    const id = isEditing && employee ? employee.id : `EMP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    // Use a default profile image
    const profileImage = formData.profileImage || 'https://randomuser.me/api/portraits/lego/1.jpg';
    
    // Create the complete employee object
    const completeEmployee: Employee = {
      id,
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || '',
      phone: formData.phone || '',
      position: formData.position || '',
      department: (formData.department as any) || 'reception',
      hireDate: formData.hireDate || new Date().toISOString().split('T')[0],
      status: (formData.status as 'active' | 'on-leave' | 'inactive') || 'active',
      profileImage,
      address: formData.address,
      birthDate: formData.birthDate,
      nationality: formData.nationality,
      manager: formData.manager,
      notes: formData.notes
    };
    
    onSave(completeEmployee);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold">
            {isEditing ? 'Modifier un Employé' : 'Ajouter un Employé'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-md font-semibold mb-4">Informations Personnelles</h4>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="employee-firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                      <Input 
                        id="employee-firstName" 
                        value={formData.firstName || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="employee-lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <Input 
                        id="employee-lastName" 
                        value={formData.lastName || ''}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="employee-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input 
                      type="email" 
                      id="employee-email" 
                      value={formData.email || ''}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="employee-phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <Input 
                      type="tel" 
                      id="employee-phone" 
                      value={formData.phone || ''}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="employee-address" className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <textarea 
                      id="employee-address" 
                      rows={3} 
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      value={formData.address || ''}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="employee-birthDate" className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                      <Input 
                        type="date" 
                        id="employee-birthDate" 
                        value={formData.birthDate || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="employee-nationality" className="block text-sm font-medium text-gray-700 mb-1">Nationalité</label>
                      <Input 
                        id="employee-nationality" 
                        value={formData.nationality || ''}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Employment Information */}
              <div>
                <h4 className="text-md font-semibold mb-4">Informations Professionnelles</h4>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="employee-id" className="block text-sm font-medium text-gray-700 mb-1">ID Employé</label>
                    <Input 
                      id="employee-id" 
                      disabled
                      value={isEditing && employee ? employee.id : 'Généré automatiquement'}
                    />
                    <p className="text-xs text-gray-500 mt-1">Généré automatiquement</p>
                  </div>
                  
                  <div>
                    <label htmlFor="employee-position" className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                    <Input 
                      id="employee-position" 
                      value={formData.position || ''}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="employee-department" className="block text-sm font-medium text-gray-700 mb-1">Département</label>
                    <select 
                      id="employee-department" 
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      value={formData.department || ''}
                      onChange={handleChange}
                    >
                      <option value="reception">Réception</option>
                      <option value="housekeeping">Entretien</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="management">Direction</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="security">Sécurité</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="employee-hireDate" className="block text-sm font-medium text-gray-700 mb-1">Date d'embauche</label>
                      <Input 
                        type="date" 
                        id="employee-hireDate" 
                        value={formData.hireDate || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="employee-status" className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                      <select 
                        id="employee-status" 
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        value={formData.status || ''}
                        onChange={handleChange}
                      >
                        <option value="active">Actif</option>
                        <option value="on-leave">En congé</option>
                        <option value="inactive">Inactif</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="employee-manager" className="block text-sm font-medium text-gray-700 mb-1">Responsable</label>
                    <select 
                      id="employee-manager" 
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      value={formData.manager || ''}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner un responsable</option>
                      <option value="001">Isabelle Laurent</option>
                      <option value="002">Thomas Dubois</option>
                      <option value="003">Marie Leroy</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="employee-notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea 
                      id="employee-notes" 
                      rows={3} 
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      value={formData.notes || ''}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <Button 
                type="button" 
                variant="secondary"
                onClick={onClose}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                variant="primary"
              >
                {isEditing ? 'Enregistrer' : 'Ajouter'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFormModal;
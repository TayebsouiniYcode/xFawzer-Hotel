import React from 'react';
import { Employee } from '../../../../types/employee';
import Button from '../../../common/Button/Button';

export interface EmployeeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

const EmployeeDetailsModal: React.FC<EmployeeDetailsModalProps> = ({ isOpen, onClose, employee }) => {
  if (!isOpen || !employee) return null;

  // Format date to DD MMM YYYY
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non spécifié';
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
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

  // Get status label and class
  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'active':
        return { label: 'Actif', className: 'bg-green-100 text-green-800' };
      case 'on-leave':
        return { label: 'En congé', className: 'bg-yellow-100 text-yellow-800' };
      case 'inactive':
        return { label: 'Inactif', className: 'bg-red-100 text-red-800' };
      default:
        return { label: status, className: 'bg-gray-100 text-gray-800' };
    }
  };

  const statusInfo = getStatusInfo(employee.status);

  // Mock data for the demo - in a real app, this would come from the employee object
  const emergencyContact = {
    name: 'Marc Laurent',
    relation: 'Époux',
    phone: '+33 6 98 76 54 32'
  };

  const skills = {
    education: 'Master en Management Hôtelier - École Hôtelière de Lausanne',
    languages: 'Français (natif), Anglais (courant), Espagnol (intermédiaire)',
    certifications: 'Certification en Management de Luxe, Formation Sécurité'
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold">Détails de l'Employé</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:space-x-6">
            {/* Employee Profile */}
            <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
              <img 
                src={employee.profileImage} 
                alt={`${employee.firstName} ${employee.lastName}`} 
                className="w-32 h-32 rounded-full mb-4"
              />
              <h4 className="text-xl font-semibold">{employee.firstName} {employee.lastName}</h4>
              <p className="text-gray-600">{employee.position}</p>
              <p className="text-sm text-gray-500 mt-1">ID: {employee.id}</p>
              
              <div className="mt-4 w-full">
                <div className={`${statusInfo.className} text-center py-1 px-2 rounded-full text-sm font-semibold`}>
                  {statusInfo.label}
                </div>
              </div>
              
              <div className="mt-6 w-full space-y-2">
                <div className="flex items-center">
                  <i className="fas fa-envelope text-gray-400 w-5"></i>
                  <span className="ml-2 text-sm">{employee.email}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone text-gray-400 w-5"></i>
                  <span className="ml-2 text-sm">{employee.phone}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-calendar text-gray-400 w-5"></i>
                  <span className="ml-2 text-sm">Embauché le {formatDate(employee.hireDate)}</span>
                </div>
              </div>
            </div>
            
            {/* Employee Details */}
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-3">Informations Personnelles</h5>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Date de naissance</p>
                      <p className="text-sm">{formatDate(employee.birthDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nationalité</p>
                      <p className="text-sm">{employee.nationality || 'Non spécifiée'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Adresse</p>
                      <p className="text-sm">{employee.address || 'Non spécifiée'}</p>
                    </div>
                  </div>
                </div>
                
                {/* Employment Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-3">Informations Professionnelles</h5>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Département</p>
                      <p className="text-sm">{getDepartmentLabel(employee.department)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Responsable</p>
                      <p className="text-sm">{employee.manager ? `ID: ${employee.manager}` : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Type de contrat</p>
                      <p className="text-sm">CDI</p>
                    </div>
                  </div>
                </div>
                
                {/* Skills & Qualifications */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-3">Compétences & Qualifications</h5>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Formation</p>
                      <p className="text-sm">{skills.education}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Langues</p>
                      <p className="text-sm">{skills.languages}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Certifications</p>
                      <p className="text-sm">{skills.certifications}</p>
                    </div>
                  </div>
                </div>
                
                {/* Emergency Contact */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-3">Contact d'Urgence</h5>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Nom</p>
                      <p className="text-sm">{emergencyContact.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Relation</p>
                      <p className="text-sm">{emergencyContact.relation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <p className="text-sm">{emergencyContact.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Notes */}
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold mb-3">Notes</h5>
                <p className="text-sm">{employee.notes || 'Aucune note disponible.'}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-3">
            <Button 
              variant="secondary"
              onClick={onClose}
            >
              Fermer
            </Button>
            <Button 
              variant="primary"
            //   icon="fas fa-print"
            >
              Imprimer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsModal;
import React from 'react';

export interface DeleteConfirmationModalProps {
  isOpen: boolean;
  itemId?: string;
  itemName?: string;
  onClose: () => void;
  onConfirm: (itemId: string) => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  itemId,
  itemName = 'cet élément',
  onClose,
  onConfirm
}) => {
  if (!isOpen || !itemId) return null;
  
  const handleConfirm = () => {
    onConfirm(itemId);
  };
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4 text-red-600">
            <i className="fas fa-exclamation-triangle text-5xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-center mb-2">
            Confirmer la suppression
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Êtes-vous sûr de vouloir supprimer {itemName} ? Cette action est irréversible.
          </p>
          <div className="flex justify-center space-x-3">
            <button 
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Annuler
            </button>
            <button 
              className="bg-red-600 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-red-700"
              onClick={handleConfirm}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
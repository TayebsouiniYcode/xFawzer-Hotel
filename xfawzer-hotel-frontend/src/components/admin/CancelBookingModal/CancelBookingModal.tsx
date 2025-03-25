import React, { useState } from 'react';

export interface CancelBookingModalProps {
  isOpen: boolean;
  bookingId?: string;
  bookingNumber?: string;
  onClose: () => void;
  onConfirm: (bookingId: string, reason: string) => void;
}

const CancelBookingModal: React.FC<CancelBookingModalProps> = ({
  isOpen,
  bookingId,
  bookingNumber,
  onClose,
  onConfirm
}) => {
  const [reason, setReason] = useState('');
  
  if (!isOpen || !bookingId) return null;
  
  const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReason(e.target.value);
  };
  
  const handleConfirm = () => {
    if (reason) {
      onConfirm(bookingId, reason);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4 text-red-600">
            <i className="fas fa-exclamation-triangle text-5xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-center mb-2">Confirmer l'annulation</h3>
          <p className="text-gray-600 text-center mb-6">
            Êtes-vous sûr de vouloir annuler cette réservation{bookingNumber ? ` (${bookingNumber})` : ''}? 
            Cette action peut entraîner des frais d'annulation selon la politique de l'hôtel.
          </p>
          
          <div className="mb-4">
            <label htmlFor="cancel-reason" className="block text-sm font-medium text-gray-700 mb-1">
              Raison de l'annulation
            </label>
            <select 
              id="cancel-reason" 
              value={reason}
              onChange={handleReasonChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              required
            >
              <option value="">Sélectionner une raison</option>
              <option value="client-request">Demande du client</option>
              <option value="payment-issue">Problème de paiement</option>
              <option value="duplicate">Réservation en double</option>
              <option value="unavailable">Chambre non disponible</option>
              <option value="other">Autre raison</option>
            </select>
          </div>
          
          <div className="flex justify-center space-x-3">
            <button 
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
              onClick={onClose}
            >
              Retour
            </button>
            <button 
              className={`bg-red-600 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-red-700 transition-colors duration-150 ${!reason ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleConfirm}
              disabled={!reason}
            >
              Confirmer l'annulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;
import React from 'react';
import { Booking } from '../../../types/booking.types';
import BookingStatusBadge from '../BookingStatusBadge';

export interface BookingDetailsModalProps {
  isOpen: boolean;
  booking?: Booking;
  onClose: () => void;
  onPrint?: () => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  isOpen,
  booking,
  onClose,
  onPrint
}) => {
  if (!isOpen || !booking) return null;
  
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold">Détails de la Réservation {booking.number}</h3>
          <button 
            className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
            onClick={onClose}
            aria-label="Fermer"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Client Information */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-md font-semibold mb-4 flex items-center">
                <i className="fas fa-user text-primary mr-2"></i>
                Informations Client
              </h4>
              
              <div className="flex items-center mb-4">
                <img className="h-12 w-12 rounded-full mr-4 object-cover" src={booking.client.avatarUrl} alt={`${booking.client.firstName} ${booking.client.lastName}`} />
                <div>
                  <div className="text-md font-medium">{`${booking.client.firstName} ${booking.client.lastName}`}</div>
                  <div className="text-sm text-gray-500">
                    {booking.client.staysCount ? 
                      `Client fidèle (${booking.client.staysCount} séjour${booking.client.staysCount > 1 ? 's' : ''})` : 
                      'Nouveau client'
                    }
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <i className="fas fa-envelope text-gray-400 w-5"></i>
                  <span className="ml-2 text-sm">{booking.client.email}</span>
                </div>
                {booking.client.phone && (
                  <div className="flex items-center">
                    <i className="fas fa-phone text-gray-400 w-5"></i>
                    <span className="ml-2 text-sm">{booking.client.phone}</span>
                  </div>
                )}
                {booking.client.address && (
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt text-gray-400 w-5"></i>
                    <span className="ml-2 text-sm">{booking.client.address}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Booking Details */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-md font-semibold mb-4 flex items-center">
                <i className="fas fa-calendar-check text-primary mr-2"></i>
                Détails du Séjour
              </h4>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Chambre</div>
                  <div className="text-md">{booking.room.type} - Chambre {booking.room.number}</div>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Arrivée</div>
                    <div className="text-md">{booking.checkIn.date}, {booking.checkIn.time}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Départ</div>
                    <div className="text-md">{booking.checkOut.date}, {booking.checkOut.time}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Durée</div>
                  <div className="text-md">{booking.nightsCount} nuit{booking.nightsCount > 1 ? 's' : ''}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Occupants</div>
                  <div className="text-md">
                    {booking.adultsCount} adulte{booking.adultsCount > 1 ? 's' : ''}
                    {booking.childrenCount > 0 && `, ${booking.childrenCount} enfant${booking.childrenCount > 1 ? 's' : ''}`}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Statut</div>
                  <div className="inline-flex items-center">
                    <BookingStatusBadge status={booking.status} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-md font-semibold mb-4 flex items-center">
                <i className="fas fa-credit-card text-primary mr-2"></i>
                Informations de Paiement
              </h4>
              
              {booking.payment ? (
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Tarif par nuit</div>
                    <div className="text-md">€{(booking.payment.amount / booking.nightsCount).toFixed(0)}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Sous-total ({booking.nightsCount} nuits)</div>
                    <div className="text-md">€{booking.payment.amount}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Taxes</div>
                    <div className="text-md">€{booking.payment.tax}</div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-sm font-medium">Total</div>
                    <div className="text-lg font-bold text-primary">€{booking.payment.total}</div>
                  </div>
                  
                  {booking.payment.method && (
                    <div>
                      <div className="text-sm text-gray-500">Méthode de paiement</div>
                      <div className="text-md flex items-center">
                        {booking.payment.method.toLowerCase().includes('visa') && <i className="fab fa-cc-visa mr-2 text-blue-700"></i>}
                        {booking.payment.method.toLowerCase().includes('mastercard') && <i className="fab fa-cc-mastercard mr-2 text-red-500"></i>}
                        {booking.payment.method.toLowerCase().includes('paypal') && <i className="fab fa-paypal mr-2 text-blue-500"></i>}
                        {booking.payment.method}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <div className="text-sm text-gray-500">Statut du paiement</div>
                    <div className="inline-flex items-center">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                        booking.payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.payment.status === 'refunded' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.payment.status === 'paid' ? 'Payé' :
                         booking.payment.status === 'pending' ? 'En attente' :
                         booking.payment.status === 'refunded' ? 'Remboursé' :
                         booking.payment.status === 'partially-refunded' ? 'Partiellement remboursé' : 
                         'Inconnu'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500 italic">Informations de paiement non disponibles</div>
              )}
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Special Requests */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-md font-semibold mb-4 flex items-center">
                <i className="fas fa-clipboard-list text-primary mr-2"></i>
                Demandes spéciales
              </h4>
              {booking.specialRequests ? (
                <p className="text-sm">{booking.specialRequests}</p>
              ) : (
                <p className="text-sm text-gray-500 italic">Aucune demande spéciale</p>
              )}
            </div>
            
            {/* Booking History */}
            {booking.history && booking.history.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold mb-4 flex items-center">
                  <i className="fas fa-history text-primary mr-2"></i>
                  Historique de la réservation
                </h4>
                <div className="space-y-3">
                  {booking.history.map((historyItem, index) => (
                    <div key={index} className="flex items-start">
                      <div className="min-w-[100px] text-sm text-gray-500">{historyItem.date}</div>
                      <div className="text-sm">{historyItem.action}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-end space-x-3">
            <button 
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
              onClick={onClose}
            >
              Fermer
            </button>
            <button 
              className="bg-primary text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 transition-colors duration-150 flex items-center"
              onClick={handlePrint}
            >
              <i className="fas fa-print mr-2"></i> Imprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
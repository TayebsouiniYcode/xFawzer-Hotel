import React from 'react';
import { Booking } from '../../../types/booking.types';
import BookingStatusBadge from '../BookingStatusBadge';

export interface BookingTableProps {
  bookings: Booking[];
  onView: (bookingId: string) => void;
  onEdit: (bookingId: string) => void;
  onCancel: (bookingId: string) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  onView,
  onEdit,
  onCancel
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Réservation
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chambre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check-in
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check-out
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
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
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{booking.number}</div>
                  <div className="text-sm text-gray-500">{booking.createdAt}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <img className="h-8 w-8 rounded-full" src={booking.client.avatarUrl} alt={`${booking.client.firstName} ${booking.client.lastName}`} />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{`${booking.client.firstName} ${booking.client.lastName}`}</div>
                      <div className="text-xs text-gray-500">{booking.client.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.room.type}</div>
                  <div className="text-xs text-gray-500">Chambre {booking.room.number}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.checkIn.date}</div>
                  <div className="text-xs text-gray-500">{booking.checkIn.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.checkOut.date}</div>
                  <div className="text-xs text-gray-500">{booking.checkOut.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {booking.payment ? 
                      `€${booking.payment.amount}` : 
                      `€${booking.room.price * booking.nightsCount}`
                    }
                  </div>
                  <div className="text-xs text-gray-500">{booking.nightsCount} nuit{booking.nightsCount > 1 ? 's' : ''}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <BookingStatusBadge status={booking.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-900" 
                      title="Voir détails"
                      onClick={() => onView(booking.id)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    {booking.status !== 'cancelled' && booking.status !== 'checked-out' ? (
                      <>
                        <button 
                          className="text-yellow-600 hover:text-yellow-900" 
                          title="Modifier"
                          onClick={() => onEdit(booking.id)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900" 
                          title="Annuler"
                          onClick={() => onCancel(booking.id)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          className="text-gray-400 cursor-not-allowed" 
                          title="Modifier"
                          disabled
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          className="text-gray-400 cursor-not-allowed" 
                          title="Annuler"
                          disabled
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
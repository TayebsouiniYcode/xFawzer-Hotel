import React from 'react';
import { BookingStat } from '../../../types/booking.types';

export interface BookingStatsProps {
  stats: BookingStat[];
}

const BookingStats: React.FC<BookingStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-5 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center">
            <div className={`${stat.color} p-3 rounded-full`}>
              <i className={`${stat.icon} text-xl`}></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <h4 className="text-xl font-semibold">{stat.count}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingStats;
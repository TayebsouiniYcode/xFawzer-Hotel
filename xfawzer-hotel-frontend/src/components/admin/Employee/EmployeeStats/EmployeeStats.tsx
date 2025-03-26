import React from 'react';

export interface EmployeeStatsProps {
  stats: {
    total: number;
    active: number;
    onLeave: number;
    inactive: number;
  };
}

const EmployeeStats: React.FC<EmployeeStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <i className="fas fa-users text-primary text-xl"></i>
          </div>
          <div className="ml-4">
            <p className="text-gray-500 text-sm">Total Employés</p>
            <h4 className="text-xl font-semibold">{stats.total}</h4>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center">
          <div className="bg-green-100 p-3 rounded-full">
            <i className="fas fa-user-check text-green-600 text-xl"></i>
          </div>
          <div className="ml-4">
            <p className="text-gray-500 text-sm">Actifs</p>
            <h4 className="text-xl font-semibold">{stats.active}</h4>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center">
          <div className="bg-yellow-100 p-3 rounded-full">
            <i className="fas fa-umbrella-beach text-yellow-600 text-xl"></i>
          </div>
          <div className="ml-4">
            <p className="text-gray-500 text-sm">En congé</p>
            <h4 className="text-xl font-semibold">{stats.onLeave}</h4>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center">
          <div className="bg-red-100 p-3 rounded-full">
            <i className="fas fa-user-times text-red-600 text-xl"></i>
          </div>
          <div className="ml-4">
            <p className="text-gray-500 text-sm">Inactifs</p>
            <h4 className="text-xl font-semibold">{stats.inactive}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeStats;
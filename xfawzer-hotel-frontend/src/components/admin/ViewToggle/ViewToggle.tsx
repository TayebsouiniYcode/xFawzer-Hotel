import React from 'react';

export type ViewMode = 'list' | 'grid';

export interface ViewToggleProps {
  viewMode: ViewMode;
  onViewChange: (viewMode: ViewMode) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ 
  viewMode, 
  onViewChange 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={() => onViewChange('list')}
        className={`p-2 rounded ${
          viewMode === 'list' 
            ? 'bg-primary text-white' 
            : 'bg-gray-200 text-gray-700'
        }`}
        aria-label="Liste"
        title="Vue liste"
      >
        <i className="fas fa-list"></i>
      </button>
      <button 
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded ${
          viewMode === 'grid' 
            ? 'bg-primary text-white' 
            : 'bg-gray-200 text-gray-700'
        }`}
        aria-label="Grille"
        title="Vue grille"
      >
        <i className="fas fa-th-large"></i>
      </button>
    </div>
  );
};

export default ViewToggle;
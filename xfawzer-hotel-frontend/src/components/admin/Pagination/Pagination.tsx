import React from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  viewMode: 'list' | 'grid';
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  viewMode
}) => {
  const startItem = ((currentPage - 1) * itemsPerPage) + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  // Générer les liens de pagination
  const renderPaginationLinks = () => {
    const links = [];
    
    // Bouton précédent
    links.push(
      <a 
        key="prev" 
        href="#" 
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        onClick={(e) => {
          e.preventDefault();
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
      >
        <span className="sr-only">Précédent</span>
        <i className="fas fa-chevron-left"></i>
      </a>
    );
    
    // Calculer quels numéros de page afficher
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    // Numéros de page
    for (let i = startPage; i <= endPage; i++) {
      links.push(
        <a 
          key={i} 
          href="#" 
          className={`${
            currentPage === i 
              ? 'z-10 bg-primary border-primary text-white' 
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
          } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(i);
          }}
        >
          {i}
        </a>
      );
    }
    
    // Afficher des points de suspension après ou avant si nécessaire
    if (endPage < totalPages) {
      links.push(
        <span key="ellipsis-after" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
          ...
        </span>
      );
      
      // Dernier numéro de page
      links.push(
        <a 
          key={totalPages} 
          href="#" 
          className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(totalPages);
          }}
        >
          {totalPages}
        </a>
      );
    }
    
    // Bouton suivant
    links.push(
      <a 
        key="next" 
        href="#" 
        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        onClick={(e) => {
          e.preventDefault();
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
      >
        <span className="sr-only">Suivant</span>
        <i className="fas fa-chevron-right"></i>
      </a>
    );
    
    return links;
  };
  
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a 
          href="#" 
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          Précédent
        </a>
        <a 
          href="#" 
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          Suivant
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Affichage de <span className="font-medium">{startItem}</span> à <span className="font-medium">{endItem}</span> sur <span className="font-medium">{totalItems}</span> résultats
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {renderPaginationLinks()}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
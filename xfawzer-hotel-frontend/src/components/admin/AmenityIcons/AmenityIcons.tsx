import React from 'react';

export interface AmenityIconsProps {
  amenities: string[];
}

const AmenityIcons: React.FC<AmenityIconsProps> = ({ amenities }) => {
  // Mapping des équipements aux icônes
  const amenityIconMap: Record<string, { icon: string; label: string }> = {
    'wifi': { icon: 'fas fa-wifi', label: 'Wi-Fi' },
    'tv': { icon: 'fas fa-tv', label: 'TV' },
    'ac': { icon: 'fas fa-snowflake', label: 'Climatisation' },
    'minibar': { icon: 'fas fa-glass-martini-alt', label: 'Mini-bar' },
    'safe': { icon: 'fas fa-lock', label: 'Coffre-fort' },
    'jacuzzi': { icon: 'fas fa-hot-tub', label: 'Jacuzzi' },
    'balcony': { icon: 'fas fa-door-open', label: 'Balcon' },
    'bathtub': { icon: 'fas fa-bath', label: 'Baignoire' },
    'mountain-view': { icon: 'fas fa-mountain', label: 'Vue montagne' },
    'sea-view': { icon: 'fas fa-water', label: 'Vue mer' },
    'room-service': { icon: 'fas fa-concierge-bell', label: 'Service en chambre' }
  };
  
  return (
    <div className="flex space-x-1 flex-wrap gap-1">
      {amenities.map((amenity, index) => {
        const amenityConfig = amenityIconMap[amenity] || { 
          icon: 'fas fa-check', 
          label: amenity
        };
        
        return (
          <span 
            key={index} 
            className="px-2 py-1 text-xs rounded bg-gray-100"
            title={amenityConfig.label}
          >
            <i className={amenityConfig.icon}></i>
          </span>
        );
      })}
    </div>
  );
};

export default AmenityIcons;
import React, { useState, useEffect } from 'react';
import { RoomFormData, RoomDetails, RoomType, RoomStatus, BedConfiguration, RoomView } from '../../../types/admin.types';

export interface RoomFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: RoomFormData) => void;
  roomData?: RoomDetails;
}

const RoomFormModal: React.FC<RoomFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  roomData
}) => {
  const [formData, setFormData] = useState<RoomFormData>({
    number: '',
    floor: '1',
    type: 'standard',
    status: 'available',
    capacity: 2,
    price: 120,
    bedConfiguration: '1-double',
    view: 'city',
    amenities: ['wifi', 'tv', 'ac'],
    description: ''
  });
  
  const [fileName, setFileName] = useState<string>('Aucun fichier sélectionné');
  
  // Initialiser le formulaire avec les données de la chambre si fournies
  useEffect(() => {
    if (roomData) {
      setFormData({
        number: roomData.number,
        floor: roomData.floor.toString(),
        type: roomData.type,
        status: roomData.status,
        capacity: roomData.capacity,
        price: roomData.price,
        bedConfiguration: roomData.bedConfiguration,
        view: roomData.view,
        amenities: roomData.amenities,
        description: roomData.description
      });
    } else {
      // Réinitialiser le formulaire
      setFormData({
        number: '',
        floor: '1',
        type: 'standard',
        status: 'available',
        capacity: 2,
        price: 120,
        bedConfiguration: '1-double',
        view: 'city',
        amenities: ['wifi', 'tv', 'ac'],
        description: ''
      });
      setFileName('Aucun fichier sélectionné');
    }
  }, [roomData, isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, value]
      });
    } else {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((amenity) => amenity !== value)
      });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      setFormData({
        ...formData,
        image: files[0]
      });
    } else {
      setFileName('Aucun fichier sélectionné');
      const newFormData = { ...formData };
      delete newFormData.image;
      setFormData(newFormData);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold">
            {roomData ? `Modifier la Chambre ${roomData.number}` : 'Ajouter une Chambre'}
          </h3>
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={onClose}
            aria-label="Fermer"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="p-6">
          <form id="room-form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de Chambre
                </label>
                <input 
                  type="text" 
                  id="number" 
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" 
                  placeholder="ex: 101"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="floor" className="block text-sm font-medium text-gray-700 mb-1">
                  Étage
                </label>
                <select 
                  id="floor" 
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  required
                >
                  <option value="1">1er étage</option>
                  <option value="2">2ème étage</option>
                  <option value="3">3ème étage</option>
                  <option value="4">4ème étage</option>
                  <option value="5">5ème étage</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type de Chambre
                </label>
                <select 
                  id="type" 
                  name="type"
                  value={formData.type}
                  onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  required
                >
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                  <option value="family">Familiale</option>
                  <option value="presidential">Présidentielle</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select 
                  id="status" 
                  name="status"
                  value={formData.status}
                  onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  required
                >
                  <option value="available">Disponible</option>
                  <option value="occupied">Occupée</option>
                  <option value="maintenance">En maintenance</option>
                  <option value="cleaning">En nettoyage</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Capacité
                </label>
                <input 
                  type="number" 
                  id="capacity" 
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="1" 
                  max="10" 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" 
                  placeholder="ex: 2"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Prix par Nuit (€)
                </label>
                <input 
                  type="number" 
                  id="price" 
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0" 
                  step="0.01" 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" 
                  placeholder="ex: 120.00"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="bedConfiguration" className="block text-sm font-medium text-gray-700 mb-1">
                  Configuration des Lits
                </label>
                <select 
                  id="bedConfiguration" 
                  name="bedConfiguration"
                  value={formData.bedConfiguration}
                  onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  required
                >
                  <option value="1-double">1 lit double</option>
                  <option value="2-single">2 lits simples</option>
                  <option value="1-king">1 lit king-size</option>
                  <option value="1-queen">1 lit queen-size</option>
                  <option value="1-king-1-sofa">1 lit king-size + 1 canapé-lit</option>
                  <option value="2-king">2 lits king-size</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="view" className="block text-sm font-medium text-gray-700 mb-1">
                  Vue
                </label>
                <select 
                  id="view" 
                  name="view"
                  value={formData.view}
                  onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  required
                >
                  <option value="city">Ville</option>
                  <option value="garden">Jardin</option>
                  <option value="pool">Piscine</option>
                  <option value="sea">Mer</option>
                  <option value="mountain">Montagne</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Équipements
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="wifi" 
                    name="amenities" 
                    value="wifi"
                    checked={formData.amenities.includes('wifi')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="wifi" className="ml-2 block text-sm text-gray-700">Wi-Fi</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="tv" 
                    name="amenities" 
                    value="tv"
                    checked={formData.amenities.includes('tv')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="tv" className="ml-2 block text-sm text-gray-700">TV</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="ac" 
                    name="amenities" 
                    value="ac"
                    checked={formData.amenities.includes('ac')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="ac" className="ml-2 block text-sm text-gray-700">Climatisation</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="minibar" 
                    name="amenities" 
                    value="minibar"
                    checked={formData.amenities.includes('minibar')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="minibar" className="ml-2 block text-sm text-gray-700">Mini-bar</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="safe" 
                    name="amenities" 
                    value="safe"
                    checked={formData.amenities.includes('safe')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="safe" className="ml-2 block text-sm text-gray-700">Coffre-fort</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="jacuzzi" 
                    name="amenities" 
                    value="jacuzzi"
                    checked={formData.amenities.includes('jacuzzi')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="jacuzzi" className="ml-2 block text-sm text-gray-700">Jacuzzi</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="balcony" 
                    name="amenities" 
                    value="balcony"
                    checked={formData.amenities.includes('balcony')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="balcony" className="ml-2 block text-sm text-gray-700">Balcon</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="bathtub" 
                    name="amenities" 
                    value="bathtub"
                    checked={formData.amenities.includes('bathtub')}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="bathtub" className="ml-2 block text-sm text-gray-700">Baignoire</label>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea 
                id="description" 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3} 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" 
                placeholder="Description détaillée de la chambre..."
              ></textarea>
            </div>
            
            <div className="mt-6">
              <label htmlFor="room-image" className="block text-sm font-medium text-gray-700 mb-1">
                Image de la Chambre
              </label>
              <div className="flex items-center">
                <input 
                  type="file" 
                  id="room-image" 
                  name="room-image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label 
                  htmlFor="room-image" 
                  className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <i className="fas fa-upload mr-2"></i> Choisir une image
                </label>
                <span className="ml-3 text-sm text-gray-500">{fileName}</span>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <button 
                type="button" 
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={onClose}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="bg-primary text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-blue-900"
              >
                {roomData ? 'Enregistrer' : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomFormModal;
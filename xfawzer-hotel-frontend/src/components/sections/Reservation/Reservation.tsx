import React, { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';

export interface ReservationFormData {
  arrivalDate: string;
  departureDate: string;
  guests: string;
}

export interface ReservationProps {
  onSubmit?: (data: ReservationFormData) => void;
}

const Reservation: React.FC<ReservationProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    arrivalDate: '',
    departureDate: '',
    guests: '2',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };
  
  const guestOptions = [
    { value: '1', label: '1 personne' },
    { value: '2', label: '2 personnes' },
    { value: '3', label: '3 personnes' },
    { value: '4', label: '4 personnes' },
    { value: '5', label: '5+ personnes' },
  ];
  
  return (
    <section id="reserver" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8 -mt-20 relative z-20">
          <h3 className="text-2xl font-bold text-center mb-6">Réservez votre séjour</h3>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
            <Input
              label="Date d'arrivée"
              type="date"
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleChange}
              required
            />
            <Input
              label="Date de départ"
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              required
            />
            <Input
              label="Nombre de personnes"
              type="select"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              options={guestOptions}
            />
            <div className="md:col-span-3">
              <Button type="submit" variant="primary" fullWidth>
                Vérifier la disponibilité
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
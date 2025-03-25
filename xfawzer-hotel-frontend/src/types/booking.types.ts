export type BookingStatus = 'confirmed' | 'pending' | 'checked-in' | 'checked-out' | 'cancelled' | 'no-show';

export interface BookingClient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  address?: string;
  staysCount?: number;
}

export interface BookingRoom {
  id: string;
  number: string;
  type: string;
  floor: number;
  capacity: number;
  price: number;
}

export interface BookingPayment {
  amount: number;
  tax: number;
  total: number;
  method: string;
  cardNumber?: string;
  status: 'paid' | 'pending' | 'refunded' | 'partially-refunded';
}

export interface BookingHistory {
  date: string;
  action: string;
}

export interface Booking {
  id: string;
  number: string;
  createdAt: string;
  client: BookingClient;
  room: BookingRoom;
  checkIn: {
    date: string;
    time: string;
  };
  checkOut: {
    date: string;
    time: string;
  };
  nightsCount: number;
  adultsCount: number;
  childrenCount: number;
  status: BookingStatus;
  payment?: BookingPayment;
  specialRequests?: string;
  history?: BookingHistory[];
}

export interface BookingFormData {
  clientId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roomType: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  status: BookingStatus;
  specialRequests?: string;
}

export interface BookingFiltersType {
  dateRange: string;
  status: string;
  roomType: string;
  searchQuery: string;
}

export interface BookingStat {
  label: string;
  count: number;
  icon: string;
  color: string;
}
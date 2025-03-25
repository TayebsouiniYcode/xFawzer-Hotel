export type RoomStatus = 'available' | 'occupied' | 'maintenance' | 'cleaning';
export type RoomType = 'standard' | 'deluxe' | 'suite' | 'family' | 'presidential';
export type RoomView = 'city' | 'garden' | 'pool' | 'sea' | 'mountain';
export type BedConfiguration = 
  | '1-double' 
  | '2-single' 
  | '1-king' 
  | '1-queen' 
  | '1-king-1-sofa' 
  | '2-king';

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface RoomDetails {
  id: string;
  number: string;
  floor: number;
  type: RoomType;
  status: RoomStatus;
  capacity: number;
  price: number;
  bedConfiguration: BedConfiguration;
  bedConfigurationText: string;
  view: RoomView;
  amenities: string[];
  description: string;
  imageUrl?: string;
}

export interface SidebarItem {
  label: string;
  icon: string;
  href: string;
  isActive?: boolean;
}

export interface SidebarCategory {
  title: string;
  items: SidebarItem[];
}

export interface NotificationType {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface FilterOptions {
  roomType: string;
  roomStatus: string;
  floor: string;
}

export interface RoomFormData {
  number: string;
  floor: string;
  type: RoomType;
  status: RoomStatus;
  capacity: number;
  price: number;
  bedConfiguration: BedConfiguration;
  view: RoomView;
  amenities: string[];
  description: string;
  image?: File;
}

export type UserRole = 'customer' | 'provider';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  items?: string[];
}

export interface ServiceProvider {
  id: string;
  name: string;
  companyName?: string;
  type: 'poojari' | 'plumber';
  experience: number;
  languages: string[];
  rating: number;
  location: string;
  bio: string;
  temple?: string; // Specific to Poojari
  services: Service[];
  verified: boolean;
  avatar: string;
}

export interface CartItem {
  providerId: string;
  providerName: string;
  service: Service;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  providerId: string;
  providerName: string;
  service: Service;
  date: string;
  time: string;
  status: BookingStatus;
  totalAmount: number;
  paymentMethod: string;
  createdAt: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

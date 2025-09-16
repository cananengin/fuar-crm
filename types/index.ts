import { Timestamp } from 'firebase/firestore';

export type UserType = 'visitor' | 'exhibitor';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  userType: UserType;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

export interface Contact {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  company: string;
  email?: string;
  phone?: string;
  position?: string;
  notes?: string;
  profileImageUrl?: string;
  ocrImageUrl?: string;
  ocrData?: OCRData;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

export interface OCRData {
  rawText: string;
  extractedData: {
    firstName?: string;
    lastName?: string;
    company?: string;
    email?: string;
    phone?: string;
    position?: string;
  };
  confidence: number;
  processedAt: Date | Timestamp;
}

export interface Message {
  id: string;
  userId: string;
  contactId?: string;
  recipientEmail: string;
  recipientName?: string;
  subject: string;
  content: string;
  type: 'self' | 'contact';
  status: 'sent' | 'failed' | 'pending';
  sentAt: Date | Timestamp;
  createdAt: Date | Timestamp;
}

export interface Statistics {
  id: string;
  userId: string;
  totalContacts: number;
  totalMessages: number;
  contactsThisWeek: number;
  messagesThisWeek: number;
  contactsToday: number;
  messagesToday: number;
  lastUpdated: Date | Timestamp;
}

export interface EmailTemplate {
  id: string;
  userId: string;
  name: string;
  subject: string;
  content: string;
  isDefault: boolean;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

// Form types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  company: string;
  email?: string;
  phone?: string;
  position?: string;
  notes?: string;
}

export interface MessageFormData {
  recipientEmail: string;
  recipientName?: string;
  subject: string;
  content: string;
  type: 'self' | 'contact';
}

// API Response types
export interface OCRResponse {
  success: boolean;
  data?: OCRData;
  error?: string;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Navigation types
export type RootStackParamList = {
  '(tabs)': undefined;
  auth: undefined;
  modal: undefined;
};

export type AuthStackParamList = {
  login: undefined;
  register: undefined;
};

export type TabParamList = {
  index: undefined;
  contacts: undefined;
  messages: undefined;
  profile: undefined;
};
export type UserRole = 'patient' | 'doctor' | 'admin' | 'secretary';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: string;
  bloodType?: string;
  allergies?: string[];
  medicalHistory?: string[];
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  licenseNumber: string;
  department?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  type: 'lab' | 'imaging' | 'consultation' | 'prescription';
  title: string;
  description: string;
  doctorId: string;
  doctorName: string;
  results?: string;
  attachments?: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  reason: string;
  notes?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  refillRequested?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  receiverId: string;
  receiverName: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'appointment' | 'prescription' | 'message' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  data?: any;
}

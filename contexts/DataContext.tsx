import createContextHook from '@nkzw/create-context-hook';
import { useState } from 'react';
import { Appointment, MedicalRecord, Prescription, Message, Notification } from '@/types';

const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'John Doe',
    doctorId: '2',
    doctorName: 'Dr. Sarah Smith',
    date: '2025-12-20',
    time: '10:00 AM',
    status: 'scheduled',
    reason: 'Annual checkup',
  },
  {
    id: '2',
    patientId: '1',
    patientName: 'John Doe',
    doctorId: '2',
    doctorName: 'Dr. Sarah Smith',
    date: '2025-12-25',
    time: '2:30 PM',
    status: 'confirmed',
    reason: 'Follow-up consultation',
  },
];

const DEMO_RECORDS: MedicalRecord[] = [
  {
    id: '1',
    patientId: '1',
    date: '2025-12-10',
    type: 'lab',
    title: 'Blood Test Results',
    description: 'Complete blood count',
    doctorId: '2',
    doctorName: 'Dr. Sarah Smith',
    results: 'All values within normal range',
  },
  {
    id: '2',
    patientId: '1',
    date: '2025-12-05',
    type: 'imaging',
    title: 'X-Ray Chest',
    description: 'Routine chest X-ray',
    doctorId: '2',
    doctorName: 'Dr. Sarah Smith',
    results: 'No abnormalities detected',
  },
];

const DEMO_PRESCRIPTIONS: Prescription[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '2',
    doctorName: 'Dr. Sarah Smith',
    medication: 'Amoxicillin',
    dosage: '500mg',
    frequency: '3 times daily',
    startDate: '2025-12-10',
    endDate: '2025-12-20',
    status: 'active',
  },
];

export const [DataContext, useData] = createContextHook(() => {
  const [appointments, setAppointments] = useState<Appointment[]>(DEMO_APPOINTMENTS);
  const [medicalRecords] = useState<MedicalRecord[]>(DEMO_RECORDS);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(DEMO_PRESCRIPTIONS);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev =>
      prev.map(apt => (apt.id === id ? { ...apt, ...updates } : apt))
    );
  };

  const cancelAppointment = (id: string) => {
    updateAppointment(id, { status: 'cancelled' });
  };

  const requestRefill = (prescriptionId: string) => {
    setPrescriptions(prev =>
      prev.map(p =>
        p.id === prescriptionId ? { ...p, refillRequested: true } : p
      )
    );
  };

  const sendMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const markMessageAsRead = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg => (msg.id === messageId ? { ...msg, read: true } : msg))
    );
  };

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [...prev, notification]);
  };

  return {
    appointments,
    medicalRecords,
    prescriptions,
    messages,
    notifications,
    addAppointment,
    updateAppointment,
    cancelAppointment,
    requestRefill,
    sendMessage,
    markMessageAsRead,
    addNotification,
  };
});

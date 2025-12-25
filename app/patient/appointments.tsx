import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, Plus, X } from 'lucide-react-native';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Appointment } from '@/types';

export default function AppointmentsScreen() {
  const { appointments, addAppointment, cancelAppointment } = useData();
  const { user } = useAuth();
  const [showBooking, setShowBooking] = useState(false);
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const patientAppointments = appointments.filter(apt => apt.patientId === user?.id);
  const upcoming = patientAppointments.filter(apt => apt.status !== 'cancelled');
  const past = patientAppointments.filter(apt => apt.status === 'cancelled' || apt.status === 'completed');

  const handleBookAppointment = () => {
    if (!reason || !date || !time) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      patientId: user?.id || '',
      patientName: user?.name || '',
      doctorId: '2',
      doctorName: 'Dr. Sarah Smith',
      date,
      time,
      status: 'scheduled',
      reason,
    };

    addAppointment(newAppointment);
    setShowBooking(false);
    setReason('');
    setDate('');
    setTime('');
    Alert.alert('Success', 'Appointment booked successfully');
  };

  const handleCancelAppointment = (id: string) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            cancelAppointment(id);
            Alert.alert('Success', 'Appointment cancelled');
          },
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { bg: '#DCFCE7', text: '#15803D' };
      case 'scheduled':
        return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'cancelled':
        return { bg: '#FEE2E2', text: '#991B1B' };
      case 'completed':
        return { bg: '#F3F4F6', text: '#4B5563' };
      default:
        return { bg: '#F8FAFC', text: '#64748B' };
    }
  };

  if (showBooking) {
    return (
      <View style={styles.container}>
        <SafeAreaView edges={['top']} style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Book Appointment</Text>
            <TouchableOpacity onPress={() => setShowBooking(false)}>
              <X size={24} color="#1E293B" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Reason for Visit</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., Annual checkup"
              value={reason}
              onChangeText={setReason}
              multiline
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="2025-12-20"
              value={date}
              onChangeText={setDate}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Time</Text>
            <TextInput
              style={styles.textInput}
              placeholder="10:00 AM"
              value={time}
              onChangeText={setTime}
            />
          </View>

          <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
            <Text style={styles.bookButtonText}>Book Appointment</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Appointments</Text>
            <Text style={styles.headerSubtitle}>{upcoming.length} upcoming</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => setShowBooking(true)}>
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Upcoming</Text>
        {upcoming.map(apt => {
          const colors = getStatusColor(apt.status);
          return (
            <View key={apt.id} style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <Text style={styles.doctorName}>{apt.doctorName}</Text>
                <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
                  <Text style={[styles.statusText, { color: colors.text }]}>{apt.status}</Text>
                </View>
              </View>
              
              <Text style={styles.reason}>{apt.reason}</Text>
              
              <View style={styles.dateTimeRow}>
                <View style={styles.dateTime}>
                  <Calendar size={16} color="#0891B2" />
                  <Text style={styles.dateTimeText}>{apt.date}</Text>
                </View>
                <View style={styles.dateTime}>
                  <Clock size={16} color="#0891B2" />
                  <Text style={styles.dateTimeText}>{apt.time}</Text>
                </View>
              </View>

              {apt.status !== 'cancelled' && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => handleCancelAppointment(apt.id)}
                >
                  <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}

        {upcoming.length === 0 && (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No upcoming appointments</Text>
          </View>
        )}

        {past.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Past</Text>
            {past.map(apt => {
              const colors = getStatusColor(apt.status);
              return (
                <View key={apt.id} style={styles.appointmentCard}>
                  <View style={styles.appointmentHeader}>
                    <Text style={styles.doctorName}>{apt.doctorName}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
                      <Text style={[styles.statusText, { color: colors.text }]}>{apt.status}</Text>
                    </View>
                  </View>
                  <Text style={styles.reason}>{apt.reason}</Text>
                  <Text style={styles.dateTimeText}>{apt.date} at {apt.time}</Text>
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: '#1E293B',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0891B2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#1E293B',
    marginBottom: 12,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1E293B',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
  reason: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateTimeText: {
    fontSize: 14,
    color: '#0891B2',
    fontWeight: '500' as const,
  },
  cancelButton: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#DC2626',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#1E293B',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
  },
  bookButton: {
    backgroundColor: '#0891B2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
});

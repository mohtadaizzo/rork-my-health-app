import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, Filter, CheckCircle, XCircle } from 'lucide-react-native';
import { useData } from '@/contexts/DataContext';

export default function SecretaryAppointments() {
  const { appointments, updateAppointment } = useData();
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'confirmed'>('all');

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  const handleConfirmAppointment = (id: string) => {
    Alert.alert(
      'Confirm Appointment',
      'Mark this appointment as confirmed?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            updateAppointment(id, { status: 'confirmed' });
            Alert.alert('Success', 'Appointment confirmed');
          },
        },
      ]
    );
  };

  const handleCancelAppointment = (id: string) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            updateAppointment(id, { status: 'cancelled' });
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

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Text style={styles.headerTitle}>Appointment Management</Text>
        <Text style={styles.headerSubtitle}>
          {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? 's' : ''}
        </Text>
      </SafeAreaView>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterChip, filter === 'all' && styles.filterChipActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filter === 'scheduled' && styles.filterChipActive]}
          onPress={() => setFilter('scheduled')}
        >
          <Text style={[styles.filterText, filter === 'scheduled' && styles.filterTextActive]}>
            Scheduled
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filter === 'confirmed' && styles.filterChipActive]}
          onPress={() => setFilter('confirmed')}
        >
          <Text style={[styles.filterText, filter === 'confirmed' && styles.filterTextActive]}>
            Confirmed
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {filteredAppointments.map(apt => {
          const colors = getStatusColor(apt.status);
          return (
            <View key={apt.id} style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <View style={styles.appointmentInfo}>
                  <Text style={styles.patientName}>{apt.patientName}</Text>
                  <Text style={styles.doctorName}>Dr: {apt.doctorName}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
                  <Text style={[styles.statusText, { color: colors.text }]}>{apt.status}</Text>
                </View>
              </View>
              
              <Text style={styles.reason}>{apt.reason}</Text>
              
              <View style={styles.dateTimeRow}>
                <View style={styles.dateTime}>
                  <Calendar size={16} color="#F59E0B" />
                  <Text style={styles.dateTimeText}>{apt.date}</Text>
                </View>
                <View style={styles.dateTime}>
                  <Clock size={16} color="#F59E0B" />
                  <Text style={styles.dateTimeText}>{apt.time}</Text>
                </View>
              </View>

              {apt.status === 'scheduled' && (
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.confirmButton]}
                    onPress={() => handleConfirmAppointment(apt.id)}
                  >
                    <CheckCircle size={18} color="#FFFFFF" />
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.cancelButton]}
                    onPress={() => handleCancelAppointment(apt.id)}
                  >
                    <XCircle size={18} color="#FFFFFF" />
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}

        {filteredAppointments.length === 0 && (
          <View style={styles.emptyState}>
            <Filter size={64} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>No appointments</Text>
            <Text style={styles.emptyText}>No appointments match the current filter</Text>
          </View>
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
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
  },
  filterChipActive: {
    backgroundColor: '#F59E0B',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#64748B',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
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
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  appointmentInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1E293B',
    marginBottom: 2,
  },
  doctorName: {
    fontSize: 14,
    color: '#64748B',
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
    color: '#F59E0B',
    fontWeight: '500' as const,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  confirmButton: {
    backgroundColor: '#22C55E',
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#EF4444',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: '#64748B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#94A3B8',
  },
});

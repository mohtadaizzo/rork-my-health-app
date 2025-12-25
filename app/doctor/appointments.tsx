import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock } from 'lucide-react-native';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';

export default function DoctorAppointments() {
  const { appointments } = useData();
  const { user } = useAuth();

  const doctorAppointments = appointments.filter(apt => apt.doctorId === user?.id);

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
        <Text style={styles.headerTitle}>Appointment Schedule</Text>
        <Text style={styles.headerSubtitle}>
          {doctorAppointments.length} appointment{doctorAppointments.length !== 1 ? 's' : ''}
        </Text>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {doctorAppointments.map(apt => {
          const colors = getStatusColor(apt.status);
          return (
            <TouchableOpacity key={apt.id} style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <Text style={styles.patientName}>{apt.patientName}</Text>
                <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
                  <Text style={[styles.statusText, { color: colors.text }]}>{apt.status}</Text>
                </View>
              </View>
              
              <Text style={styles.reason}>{apt.reason}</Text>
              
              <View style={styles.dateTimeRow}>
                <View style={styles.dateTime}>
                  <Calendar size={16} color="#7C3AED" />
                  <Text style={styles.dateTimeText}>{apt.date}</Text>
                </View>
                <View style={styles.dateTime}>
                  <Clock size={16} color="#7C3AED" />
                  <Text style={styles.dateTimeText}>{apt.time}</Text>
                </View>
              </View>

              {apt.notes && (
                <View style={styles.notesContainer}>
                  <Text style={styles.notesLabel}>Notes:</Text>
                  <Text style={styles.notesText}>{apt.notes}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {doctorAppointments.length === 0 && (
          <View style={styles.emptyState}>
            <Calendar size={64} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>No appointments</Text>
            <Text style={styles.emptyText}>Your appointment schedule is empty</Text>
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
    alignItems: 'center',
    marginBottom: 8,
  },
  patientName: {
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
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateTimeText: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '500' as const,
  },
  notesContainer: {
    marginTop: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#7C3AED',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#1E293B',
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

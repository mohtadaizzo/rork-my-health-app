import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const { appointments } = useData();

  const doctorAppointments = appointments.filter(apt => apt.doctorId === user?.id);
  const todayAppointments = doctorAppointments.filter(
    apt => apt.date === new Date().toISOString().split('T')[0]
  );
  const upcomingAppointments = doctorAppointments.filter(
    apt => apt.status === 'scheduled' || apt.status === 'confirmed'
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#8B5CF6']} style={styles.header}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Good day,</Text>
              <Text style={styles.userName}>{user?.name}</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#EFF6FF' }]}>
            <View style={[styles.statIcon, { backgroundColor: '#3B82F6' }]}>
              <Calendar size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.statValue}>{todayAppointments.length}</Text>
            <Text style={styles.statLabel}>Today&apos;s Appointments</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#F0FDF4' }]}>
            <View style={[styles.statIcon, { backgroundColor: '#22C55E' }]}>
              <CheckCircle size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.statValue}>{upcomingAppointments.length}</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today&apos;s Schedule</Text>
          {todayAppointments.length > 0 ? (
            todayAppointments.map(apt => (
              <View key={apt.id} style={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <Text style={styles.patientName}>{apt.patientName}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: '#DBEAFE' }]}>
                    <Text style={[styles.statusText, { color: '#1E40AF' }]}>
                      {apt.status}
                    </Text>
                  </View>
                </View>
                <Text style={styles.appointmentReason}>{apt.reason}</Text>
                <View style={styles.appointmentTime}>
                  <Clock size={16} color="#7C3AED" />
                  <Text style={styles.timeText}>{apt.time}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No appointments scheduled for today</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Users size={20} color="#7C3AED" />
            <Text style={styles.actionText}>View All Patients</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Calendar size={20} color="#7C3AED" />
            <Text style={styles.actionText}>Manage Schedule</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#E9D5FF',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: '#FFFFFF',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
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
  appointmentReason: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  appointmentTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#7C3AED',
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
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  actionText: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500' as const,
  },
});

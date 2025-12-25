import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, FileText, Pill, Bell } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';

export default function PatientHome() {
  const { user } = useAuth();
  const { appointments, prescriptions, notifications } = useData();

  const upcomingAppointments = appointments.filter(
    apt => apt.status !== 'cancelled' && new Date(apt.date) >= new Date()
  );
  const activePrescriptions = prescriptions.filter(p => p.status === 'active');
  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0891B2', '#06B6D4']} style={styles.header}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.userName}>{user?.name}</Text>
            </View>
            {unreadNotifications.length > 0 && (
              <View style={styles.notificationBadge}>
                <Bell size={20} color="#FFFFFF" />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadNotifications.length}</Text>
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#EFF6FF' }]}>
            <View style={[styles.statIcon, { backgroundColor: '#3B82F6' }]}>
              <Calendar size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.statValue}>{upcomingAppointments.length}</Text>
            <Text style={styles.statLabel}>Upcoming Appointments</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#F0FDF4' }]}>
            <View style={[styles.statIcon, { backgroundColor: '#22C55E' }]}>
              <Pill size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.statValue}>{activePrescriptions.length}</Text>
            <Text style={styles.statLabel}>Active Medications</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Appointment</Text>
          {upcomingAppointments.length > 0 ? (
            <View style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <Text style={styles.appointmentDoctor}>
                  {upcomingAppointments[0].doctorName}
                </Text>
                <View style={[styles.statusBadge, { backgroundColor: '#DBEAFE' }]}>
                  <Text style={[styles.statusText, { color: '#1E40AF' }]}>
                    {upcomingAppointments[0].status}
                  </Text>
                </View>
              </View>
              <Text style={styles.appointmentReason}>{upcomingAppointments[0].reason}</Text>
              <View style={styles.appointmentDateTime}>
                <Text style={styles.appointmentDate}>{upcomingAppointments[0].date}</Text>
                <Text style={styles.appointmentTime}>{upcomingAppointments[0].time}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No upcoming appointments</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Medications</Text>
          {activePrescriptions.map(prescription => (
            <View key={prescription.id} style={styles.medicationCard}>
              <View style={styles.medicationHeader}>
                <Text style={styles.medicationName}>{prescription.medication}</Text>
                <Text style={styles.medicationDosage}>{prescription.dosage}</Text>
              </View>
              <Text style={styles.medicationFrequency}>{prescription.frequency}</Text>
              <Text style={styles.medicationDoctor}>Prescribed by {prescription.doctorName}</Text>
            </View>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity style={styles.actionButton}>
            <FileText size={20} color="#0891B2" />
            <Text style={styles.actionText}>View Medical Records</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Calendar size={20} color="#0891B2" />
            <Text style={styles.actionText}>Book Appointment</Text>
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
    color: '#E0F2FE',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: '#FFFFFF',
    marginTop: 4,
  },
  notificationBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold' as const,
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
  appointmentDoctor: {
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
  appointmentDateTime: {
    flexDirection: 'row',
    gap: 16,
  },
  appointmentDate: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#0891B2',
  },
  appointmentTime: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#0891B2',
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
  medicationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1E293B',
  },
  medicationDosage: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#0891B2',
  },
  medicationFrequency: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  medicationDoctor: {
    fontSize: 12,
    color: '#94A3B8',
  },
  quickActions: {
    marginTop: 8,
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

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, UserCheck, UserCog, Activity } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

const DEMO_STATS = {
  totalUsers: 148,
  patients: 102,
  doctors: 28,
  staff: 18,
};

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#DC2626', '#EF4444']} style={styles.header}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Admin Dashboard</Text>
              <Text style={styles.userName}>{user?.name}</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#EFF6FF' }]}>
            <View style={[styles.statIcon, { backgroundColor: '#3B82F6' }]}>
              <Users size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.statValue}>{DEMO_STATS.totalUsers}</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#F0FDF4' }]}>
            <View style={[styles.statIcon, { backgroundColor: '#22C55E' }]}>
              <UserCheck size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.statValue}>{DEMO_STATS.patients}</Text>
            <Text style={styles.statLabel}>Patients</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#F5F3FF' }]}>
            <View style={[styles.statIcon, { backgroundColor: '#8B5CF6' }]}>
              <Activity size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.statValue}>{DEMO_STATS.doctors}</Text>
            <Text style={styles.statLabel}>Doctors</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#FEF3C7' }]}>
            <View style={[styles.statIcon, { backgroundColor: '#F59E0B' }]}>
              <UserCog size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.statValue}>{DEMO_STATS.staff}</Text>
            <Text style={styles.statLabel}>Staff</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Overview</Text>
          <View style={styles.overviewCard}>
            <View style={styles.overviewRow}>
              <Text style={styles.overviewLabel}>System Status</Text>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Operational</Text>
              </View>
            </View>
            <View style={styles.overviewRow}>
              <Text style={styles.overviewLabel}>Active Sessions</Text>
              <Text style={styles.overviewValue}>42</Text>
            </View>
            <View style={styles.overviewRow}>
              <Text style={styles.overviewLabel}>Database Size</Text>
              <Text style={styles.overviewValue}>2.4 GB</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>New user registered: Jane Smith (Patient)</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>Role updated: Dr. John Doe (Doctor)</Text>
            <Text style={styles.activityTime}>4 hours ago</Text>
          </View>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>System backup completed</Text>
            <Text style={styles.activityTime}>6 hours ago</Text>
          </View>
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
    paddingTop: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#FEE2E2',
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
    marginBottom: 12,
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
    marginTop: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#1E293B',
    marginBottom: 12,
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  overviewLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500' as const,
  },
  overviewValue: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600' as const,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#15803D',
  },
  activityCard: {
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
  activityText: {
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
});

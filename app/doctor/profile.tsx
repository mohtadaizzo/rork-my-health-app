import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Phone, LogOut, Stethoscope, Award } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function DoctorProfile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <User size={48} color="#FFFFFF" />
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.role}>Medical Doctor</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Stethoscope size={20} color="#7C3AED" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Specialization</Text>
                <Text style={styles.infoValue}>General Practice</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Award size={20} color="#7C3AED" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>License Number</Text>
                <Text style={styles.infoValue}>MD-2024-12345</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Mail size={20} color="#7C3AED" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{user?.email}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Phone size={20} color="#7C3AED" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{user?.phone || 'Not provided'}</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#DC2626" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#1E293B',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#64748B',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#1E293B',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500' as const,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#DC2626',
  },
});

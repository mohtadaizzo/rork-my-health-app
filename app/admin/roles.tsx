import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, Users, UserCog, Stethoscope } from 'lucide-react-native';

const ROLES = [
  {
    id: '1',
    name: 'Patient',
    icon: Users,
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    users: 102,
    permissions: ['View medical records', 'Book appointments', 'Message doctors', 'Request prescriptions'],
  },
  {
    id: '2',
    name: 'Doctor',
    icon: Stethoscope,
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
    users: 28,
    permissions: ['Access patient records', 'Manage appointments', 'Prescribe medication', 'Message patients'],
  },
  {
    id: '3',
    name: 'Administrator',
    icon: Shield,
    color: '#DC2626',
    bgColor: '#FEE2E2',
    users: 5,
    permissions: ['Manage all users', 'Assign roles', 'System configuration', 'View all data', 'Generate reports'],
  },
  {
    id: '4',
    name: 'Secretary',
    icon: UserCog,
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    users: 13,
    permissions: ['Manage appointments', 'Update patient info', 'View schedules', 'Send notifications'],
  },
];

export default function RolesScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Text style={styles.headerTitle}>Role Management</Text>
        <Text style={styles.headerSubtitle}>4 roles defined</Text>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {ROLES.map(role => {
          const Icon = role.icon;
          return (
            <View key={role.id} style={styles.roleCard}>
              <View style={styles.roleHeader}>
                <View style={[styles.roleIcon, { backgroundColor: role.bgColor }]}>
                  <Icon size={28} color={role.color} />
                </View>
                <View style={styles.roleHeaderInfo}>
                  <Text style={styles.roleName}>{role.name}</Text>
                  <Text style={styles.roleUsers}>{role.users} users</Text>
                </View>
              </View>

              <View style={styles.permissionsContainer}>
                <Text style={styles.permissionsTitle}>Permissions:</Text>
                {role.permissions.map((permission, index) => (
                  <View key={index} style={styles.permissionItem}>
                    <View style={[styles.permissionDot, { backgroundColor: role.color }]} />
                    <Text style={styles.permissionText}>{permission}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
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
  roleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  roleIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleHeaderInfo: {
    flex: 1,
  },
  roleName: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#1E293B',
    marginBottom: 4,
  },
  roleUsers: {
    fontSize: 14,
    color: '#64748B',
  },
  permissionsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 16,
  },
  permissionsTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#1E293B',
    marginBottom: 12,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  permissionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  permissionText: {
    fontSize: 14,
    color: '#64748B',
    flex: 1,
  },
});

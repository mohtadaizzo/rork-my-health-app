import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Database, Shield, Bell, Globe } from 'lucide-react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Text style={styles.headerTitle}>System Settings</Text>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.settingIcon, { backgroundColor: '#EFF6FF' }]}>
              <Globe size={20} color="#3B82F6" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Language & Region</Text>
              <Text style={styles.settingValue}>English (US)</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.settingIcon, { backgroundColor: '#F0FDF4' }]}>
              <Bell size={20} color="#22C55E" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Text style={styles.settingValue}>Enabled</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.settingIcon, { backgroundColor: '#F5F3FF' }]}>
              <Database size={20} color="#8B5CF6" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Database Management</Text>
              <Text style={styles.settingValue}>Manage backups</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={[styles.settingIcon, { backgroundColor: '#FEE2E2' }]}>
              <Shield size={20} color="#DC2626" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Security Settings</Text>
              <Text style={styles.settingValue}>Configure security</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Version</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Build</Text>
              <Text style={styles.infoValue}>2025.12.18</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Environment</Text>
              <Text style={styles.infoValue}>Production</Text>
            </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#1E293B',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500' as const,
    marginBottom: 2,
  },
  settingValue: {
    fontSize: 13,
    color: '#64748B',
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
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600' as const,
  },
});

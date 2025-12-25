import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Phone, Mail } from 'lucide-react-native';

const DEMO_PATIENTS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    lastVisit: '2025-12-10',
  },
  {
    id: '5',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 234 567 8901',
    lastVisit: '2025-12-08',
  },
  {
    id: '6',
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '+1 234 567 8902',
    lastVisit: '2025-12-05',
  },
];

export default function SecretaryPatients() {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Text style={styles.headerTitle}>Patient Directory</Text>
        <Text style={styles.headerSubtitle}>{DEMO_PATIENTS.length} patients</Text>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {DEMO_PATIENTS.map(patient => (
          <TouchableOpacity key={patient.id} style={styles.patientCard}>
            <View style={styles.patientAvatar}>
              <Users size={24} color="#F59E0B" />
            </View>
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{patient.name}</Text>
              
              <View style={styles.contactRow}>
                <Mail size={14} color="#64748B" />
                <Text style={styles.contactText}>{patient.email}</Text>
              </View>
              
              <View style={styles.contactRow}>
                <Phone size={14} color="#64748B" />
                <Text style={styles.contactText}>{patient.phone}</Text>
              </View>
              
              <Text style={styles.lastVisit}>Last visit: {patient.lastVisit}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  patientCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  patientAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1E293B',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  contactText: {
    fontSize: 13,
    color: '#64748B',
  },
  lastVisit: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
});

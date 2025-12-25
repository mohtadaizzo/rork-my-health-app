import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Search } from 'lucide-react-native';
import { useState } from 'react';
import { useData } from '@/contexts/DataContext';

const DEMO_PATIENTS = [
  {
    id: '1',
    name: 'John Doe',
    age: 35,
    bloodType: 'O+',
    lastVisit: '2025-12-10',
    condition: 'Hypertension',
  },
  {
    id: '5',
    name: 'Jane Smith',
    age: 28,
    bloodType: 'A+',
    lastVisit: '2025-12-08',
    condition: 'Diabetes Type 2',
  },
  {
    id: '6',
    name: 'Michael Brown',
    age: 42,
    bloodType: 'B+',
    lastVisit: '2025-12-05',
    condition: 'Asthma',
  },
];

export default function PatientsScreen() {
  const { medicalRecords } = useData();
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const patient = DEMO_PATIENTS.find(p => p.id === selectedPatient);
  const patientRecords = patient
    ? medicalRecords.filter(r => r.patientId === patient.id)
    : [];

  if (selectedPatient && patient) {
    return (
      <View style={styles.container}>
        <SafeAreaView edges={['top']} style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedPatient(null)}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{patient.name}</Text>
        </SafeAreaView>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <View style={styles.patientDetailCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Age:</Text>
              <Text style={styles.detailValue}>{patient.age} years</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Blood Type:</Text>
              <Text style={styles.detailValue}>{patient.bloodType}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Last Visit:</Text>
              <Text style={styles.detailValue}>{patient.lastVisit}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Condition:</Text>
              <Text style={styles.detailValue}>{patient.condition}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Medical Records</Text>
          {patientRecords.map(record => (
            <View key={record.id} style={styles.recordCard}>
              <View style={styles.recordHeader}>
                <Text style={styles.recordTitle}>{record.title}</Text>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeText}>{record.type}</Text>
                </View>
              </View>
              <Text style={styles.recordDescription}>{record.description}</Text>
              {record.results && (
                <View style={styles.resultsBox}>
                  <Text style={styles.resultsLabel}>Results:</Text>
                  <Text style={styles.resultsText}>{record.results}</Text>
                </View>
              )}
              <Text style={styles.recordDate}>{record.date}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Text style={styles.headerTitle}>Patients</Text>
        <Text style={styles.headerSubtitle}>{DEMO_PATIENTS.length} patients</Text>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748B" />
          <Text style={styles.searchPlaceholder}>Search patients...</Text>
        </View>

        {DEMO_PATIENTS.map(patient => (
          <TouchableOpacity
            key={patient.id}
            style={styles.patientCard}
            onPress={() => setSelectedPatient(patient.id)}
          >
            <View style={styles.patientAvatar}>
              <Users size={24} color="#FFFFFF" />
            </View>
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{patient.name}</Text>
              <Text style={styles.patientMeta}>
                {patient.age} years • {patient.bloodType}
              </Text>
              <Text style={styles.patientCondition}>{patient.condition}</Text>
            </View>
            <View>
              <Text style={styles.lastVisitLabel}>Last visit</Text>
              <Text style={styles.lastVisitDate}>{patient.lastVisit}</Text>
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
  backButton: {
    fontSize: 16,
    color: '#7C3AED',
    marginBottom: 8,
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#94A3B8',
  },
  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#7C3AED',
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
    marginBottom: 4,
  },
  patientMeta: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  patientCondition: {
    fontSize: 13,
    color: '#7C3AED',
    fontWeight: '500' as const,
  },
  lastVisitLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'right',
  },
  lastVisitDate: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500' as const,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#1E293B',
    marginBottom: 12,
    marginTop: 8,
  },
  patientDetailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500' as const,
  },
  detailValue: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600' as const,
  },
  recordCard: {
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
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1E293B',
    flex: 1,
  },
  typeBadge: {
    backgroundColor: '#F5F3FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
  recordDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  resultsBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  resultsLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#7C3AED',
    marginBottom: 4,
  },
  resultsText: {
    fontSize: 14,
    color: '#1E293B',
  },
  recordDate: {
    fontSize: 12,
    color: '#94A3B8',
  },
});

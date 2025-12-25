import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, FlaskConical, ImageIcon, ClipboardPlus } from 'lucide-react-native';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';

export default function RecordsScreen() {
  const { medicalRecords } = useData();
  const { user } = useAuth();

  const patientRecords = medicalRecords.filter(r => r.patientId === user?.id);

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'lab':
        return <FlaskConical size={24} color="#8B5CF6" />;
      case 'imaging':
        return <ImageIcon size={24} color="#3B82F6" />;
      case 'consultation':
        return <ClipboardPlus size={24} color="#10B981" />;
      default:
        return <FileText size={24} color="#64748B" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lab':
        return { bg: '#F5F3FF', text: '#7C3AED' };
      case 'imaging':
        return { bg: '#EFF6FF', text: '#2563EB' };
      case 'consultation':
        return { bg: '#F0FDF4', text: '#059669' };
      default:
        return { bg: '#F8FAFC', text: '#64748B' };
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Text style={styles.headerTitle}>Medical Records</Text>
        <Text style={styles.headerSubtitle}>
          {patientRecords.length} record{patientRecords.length !== 1 ? 's' : ''}
        </Text>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {patientRecords.map(record => {
          const colors = getTypeColor(record.type);
          return (
            <TouchableOpacity key={record.id} style={styles.recordCard}>
              <View style={styles.recordHeader}>
                <View style={[styles.recordIcon, { backgroundColor: colors.bg }]}>
                  {getRecordIcon(record.type)}
                </View>
                <View style={styles.recordInfo}>
                  <Text style={styles.recordTitle}>{record.title}</Text>
                  <Text style={styles.recordDoctor}>{record.doctorName}</Text>
                </View>
                <View style={[styles.typeBadge, { backgroundColor: colors.bg }]}>
                  <Text style={[styles.typeText, { color: colors.text }]}>{record.type}</Text>
                </View>
              </View>
              
              <Text style={styles.recordDescription}>{record.description}</Text>
              
              {record.results && (
                <View style={styles.resultsContainer}>
                  <Text style={styles.resultsLabel}>Results:</Text>
                  <Text style={styles.resultsText}>{record.results}</Text>
                </View>
              )}
              
              <Text style={styles.recordDate}>{record.date}</Text>
            </TouchableOpacity>
          );
        })}

        {patientRecords.length === 0 && (
          <View style={styles.emptyState}>
            <FileText size={64} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>No medical records</Text>
            <Text style={styles.emptyText}>Your medical records will appear here</Text>
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
  recordCard: {
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
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  recordIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordInfo: {
    flex: 1,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1E293B',
    marginBottom: 2,
  },
  recordDoctor: {
    fontSize: 14,
    color: '#64748B',
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
  recordDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  resultsContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  resultsLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#0891B2',
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

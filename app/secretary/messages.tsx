import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageSquare, Send } from 'lucide-react-native';
import { useData } from '@/contexts/DataContext';

export default function SecretaryMessages() {
  const { messages } = useData();

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <Text style={styles.headerSubtitle}>{messages.length} message{messages.length !== 1 ? 's' : ''}</Text>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {messages.length > 0 ? (
          messages.map(message => (
            <View key={message.id} style={styles.messageCard}>
              <View style={styles.messageHeader}>
                <View>
                  <Text style={styles.messageName}>{message.senderName}</Text>
                  <Text style={styles.messageRole}>to {message.receiverName}</Text>
                </View>
                <Send size={16} color="#F59E0B" />
              </View>
              <Text style={styles.messageSubject}>{message.subject}</Text>
              <Text style={styles.messagePreview} numberOfLines={2}>
                {message.content}
              </Text>
              <Text style={styles.messageTime}>
                {new Date(message.timestamp).toLocaleDateString()}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <MessageSquare size={64} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>No messages</Text>
            <Text style={styles.emptyText}>Messages between doctors and patients will appear here</Text>
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
  messageCard: {
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
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1E293B',
  },
  messageRole: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  messageSubject: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#1E293B',
    marginBottom: 6,
  },
  messagePreview: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  messageTime: {
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
    textAlign: 'center',
  },
});

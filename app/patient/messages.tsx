import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageSquare, Send, ArrowLeft } from 'lucide-react-native';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Message } from '@/types';

export default function MessagesScreen() {
  const { messages, sendMessage, markMessageAsRead } = useData();
  const { user } = useAuth();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [composing, setComposing] = useState(false);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const userMessages = messages.filter(
    m => m.senderId === user?.id || m.receiverId === user?.id
  );

  const handleSendMessage = () => {
    if (!subject || !content) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user?.id || '',
      senderName: user?.name || '',
      senderRole: user?.role || 'patient',
      receiverId: '2',
      receiverName: 'Dr. Sarah Smith',
      subject,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };

    sendMessage(newMessage);
    setComposing(false);
    setSubject('');
    setContent('');
    Alert.alert('Success', 'Message sent successfully');
  };

  const handleOpenMessage = (message: Message) => {
    if (!message.read && message.receiverId === user?.id) {
      markMessageAsRead(message.id);
    }
    setSelectedMessage(message);
  };

  if (composing) {
    return (
      <View style={styles.container}>
        <SafeAreaView edges={['top']} style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => setComposing(false)}>
              <ArrowLeft size={24} color="#1E293B" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New Message</Text>
            <View style={{ width: 24 }} />
          </View>
        </SafeAreaView>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>To</Text>
            <Text style={styles.staticValue}>Dr. Sarah Smith</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter subject"
              value={subject}
              onChangeText={setSubject}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.textInput, styles.messageInput]}
              placeholder="Type your message..."
              value={content}
              onChangeText={setContent}
              multiline
            />
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Send size={20} color="#FFFFFF" />
            <Text style={styles.sendButtonText}>Send Message</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  if (selectedMessage) {
    return (
      <View style={styles.container}>
        <SafeAreaView edges={['top']} style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => setSelectedMessage(null)}>
              <ArrowLeft size={24} color="#1E293B" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Message</Text>
            <View style={{ width: 24 }} />
          </View>
        </SafeAreaView>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <View style={styles.messageDetail}>
            <View style={styles.messageDetailHeader}>
              <Text style={styles.messageDetailSubject}>{selectedMessage.subject}</Text>
              <Text style={styles.messageDetailDate}>
                {new Date(selectedMessage.timestamp).toLocaleDateString()}
              </Text>
            </View>
            
            <View style={styles.messageDetailMeta}>
              <Text style={styles.messageDetailLabel}>From:</Text>
              <Text style={styles.messageDetailValue}>{selectedMessage.senderName}</Text>
            </View>
            
            <View style={styles.messageDetailMeta}>
              <Text style={styles.messageDetailLabel}>To:</Text>
              <Text style={styles.messageDetailValue}>{selectedMessage.receiverName}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <Text style={styles.messageDetailContent}>{selectedMessage.content}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Messages</Text>
            <Text style={styles.headerSubtitle}>{userMessages.length} message{userMessages.length !== 1 ? 's' : ''}</Text>
          </View>
          <TouchableOpacity style={styles.composeButton} onPress={() => setComposing(true)}>
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {userMessages.map(message => {
          const isReceived = message.receiverId === user?.id;
          return (
            <TouchableOpacity
              key={message.id}
              style={styles.messageCard}
              onPress={() => handleOpenMessage(message)}
            >
              <View style={styles.messageHeader}>
                <View style={styles.messageInfo}>
                  <Text style={styles.messageName}>
                    {isReceived ? message.senderName : message.receiverName}
                  </Text>
                  <Text style={styles.messageRole}>
                    {isReceived ? `From ${message.senderRole}` : `To ${message.receiverName}`}
                  </Text>
                </View>
                {!message.read && isReceived && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.messageSubject}>{message.subject}</Text>
              <Text style={styles.messagePreview} numberOfLines={2}>
                {message.content}
              </Text>
              <Text style={styles.messageTime}>
                {new Date(message.timestamp).toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          );
        })}

        {userMessages.length === 0 && (
          <View style={styles.emptyState}>
            <MessageSquare size={64} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>No messages</Text>
            <Text style={styles.emptyText}>Start a conversation with your doctor</Text>
            <TouchableOpacity style={styles.emptyButton} onPress={() => setComposing(true)}>
              <Text style={styles.emptyButtonText}>Send Message</Text>
            </TouchableOpacity>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  composeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0891B2',
    alignItems: 'center',
    justifyContent: 'center',
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
  messageInfo: {
    flex: 1,
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
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0891B2',
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
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: '#0891B2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#1E293B',
    marginBottom: 8,
  },
  staticValue: {
    fontSize: 16,
    color: '#64748B',
    paddingVertical: 12,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
  },
  messageInput: {
    minHeight: 150,
    textAlignVertical: 'top',
  },
  sendButton: {
    flexDirection: 'row',
    backgroundColor: '#0891B2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  messageDetail: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  messageDetailHeader: {
    marginBottom: 16,
  },
  messageDetailSubject: {
    fontSize: 22,
    fontWeight: 'bold' as const,
    color: '#1E293B',
    marginBottom: 8,
  },
  messageDetailDate: {
    fontSize: 14,
    color: '#64748B',
  },
  messageDetailMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  messageDetailLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#64748B',
    width: 60,
  },
  messageDetailValue: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
  messageDetailContent: {
    fontSize: 16,
    color: '#1E293B',
    lineHeight: 24,
  },
});

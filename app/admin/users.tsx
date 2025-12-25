import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Search, Plus, Trash2, Edit } from 'lucide-react-native';

interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin' | 'secretary';
  status: 'active' | 'inactive';
}

const DEMO_USERS: DemoUser[] = [
  { id: '1', name: 'John Doe', email: 'patient@demo.com', role: 'patient', status: 'active' },
  { id: '2', name: 'Dr. Sarah Smith', email: 'doctor@demo.com', role: 'doctor', status: 'active' },
  { id: '3', name: 'Admin User', email: 'admin@demo.com', role: 'admin', status: 'active' },
  { id: '4', name: 'Mary Johnson', email: 'secretary@demo.com', role: 'secretary', status: 'active' },
  { id: '5', name: 'Jane Wilson', email: 'jane@demo.com', role: 'patient', status: 'active' },
];

export default function UsersScreen() {
  const [users, setUsers] = useState<DemoUser[]>(DEMO_USERS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(
    u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'patient':
        return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'doctor':
        return { bg: '#F5F3FF', text: '#7C3AED' };
      case 'admin':
        return { bg: '#FEE2E2', text: '#DC2626' };
      case 'secretary':
        return { bg: '#FEF3C7', text: '#D97706' };
      default:
        return { bg: '#F8FAFC', text: '#64748B' };
    }
  };

  const handleDeleteUser = (userId: string) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setUsers(users.filter(u => u.id !== userId));
            Alert.alert('Success', 'User deleted successfully');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>User Management</Text>
            <Text style={styles.headerSubtitle}>{filteredUsers.length} users</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {filteredUsers.map(user => {
          const colors = getRoleColor(user.role);
          return (
            <View key={user.id} style={styles.userCard}>
              <View style={styles.userInfo}>
                <View style={styles.userAvatar}>
                  <Users size={24} color="#64748B" />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                  <View style={[styles.roleBadge, { backgroundColor: colors.bg }]}>
                    <Text style={[styles.roleText, { color: colors.text }]}>
                      {user.role}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.userActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Edit size={18} color="#0891B2" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDeleteUser(user.id)}
                >
                  <Trash2 size={18} color="#DC2626" />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        {filteredUsers.length === 0 && (
          <View style={styles.emptyState}>
            <Users size={64} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>No users found</Text>
            <Text style={styles.emptyText}>Try adjusting your search</Text>
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1E293B',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 6,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
  userActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
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

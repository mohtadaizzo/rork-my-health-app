import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, Heart } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(`/${user.role}` as any);
    }
  }, [user, isLoading, router]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) {
      console.log('Login successful');
    } else {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0891B2" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#0891B2', '#06B6D4', '#22D3EE']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Heart size={48} color="#FFFFFF" fill="#FFFFFF" />
          </View>
          <Text style={styles.title}>mHealth</Text>
          <Text style={styles.subtitle}>Your Health, Our Priority</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Mail size={20} color="#64748B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="#64748B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#94A3B8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.demoInfo}>
            <Text style={styles.demoTitle}>Demo Accounts:</Text>
            <Text style={styles.demoText}>Patient: patient@demo.com</Text>
            <Text style={styles.demoText}>Doctor: doctor@demo.com</Text>
            <Text style={styles.demoText}>Admin: admin@demo.com</Text>
            <Text style={styles.demoText}>Secretary: secretary@demo.com</Text>
            <Text style={styles.demoText}>Password: demo123</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold' as const,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0F2FE',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  loginButton: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  demoInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 13,
    color: '#E0F2FE',
    marginBottom: 4,
  },
});

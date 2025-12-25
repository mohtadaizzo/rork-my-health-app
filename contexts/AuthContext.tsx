import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { User } from '@/types';

export const [AuthContext, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const demoUsers: User[] = [
        {
          id: '1',
          email: 'patient@demo.com',
          name: 'John Doe',
          role: 'patient',
          phone: '+1234567890',
        },
        {
          id: '2',
          email: 'doctor@demo.com',
          name: 'Dr. Sarah Smith',
          role: 'doctor',
          phone: '+1234567891',
        },
        {
          id: '3',
          email: 'admin@demo.com',
          name: 'Admin User',
          role: 'admin',
          phone: '+1234567892',
        },
        {
          id: '4',
          email: 'secretary@demo.com',
          name: 'Mary Johnson',
          role: 'secretary',
          phone: '+1234567893',
        },
      ];

      const foundUser = demoUsers.find(u => u.email === email);
      
      if (foundUser && password === 'demo123') {
        await AsyncStorage.setItem('user', JSON.stringify(foundUser));
        setUser(foundUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const register = async (email: string, password: string, name: string, role: User['role']) => {
    try {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role,
        phone: '',
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  return {
    user,
    isLoading,
    login,
    logout,
    register,
  };
});

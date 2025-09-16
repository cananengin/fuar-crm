import { useAuth } from '@/contexts/AuthContext';
import { router, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';

    console.log('AuthGuard - user:', !!user, 'inAuthGroup:', inAuthGroup, 'segments:', segments);

    if (!user && !inAuthGroup) {
      // User is not authenticated and not in auth group, redirect to login
      console.log('Redirecting to login...');
      router.replace('/auth/login');
    } else if (user && inAuthGroup) {
      // User is authenticated but in auth group, redirect to main app
      console.log('Redirecting to main app...');
      router.replace('/(tabs)');
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
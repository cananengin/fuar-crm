import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { user, userProfile, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    console.log('Logout button pressed!');
    const confirmed = confirm('Are you sure you want to logout?');
    if (confirmed) {
      console.log('Logout confirmed, starting process...');
      setLoading(true);
      try {
        console.log('Profile screen - starting logout...');
        await logout();
        console.log('Profile screen - logout successful, navigating...');
        router.replace('/auth/login');
      } catch (error) {
        console.error('Profile screen - logout error:', error);
        alert('Failed to logout: ' + error.message);
        setLoading(false);
      }
    } else {
      console.log('Logout cancelled');
    }
  };

  const menuItems = [
    {
      title: 'Statistics',
      subtitle: 'View your activity stats',
      icon: 'chart.bar.fill',
      onPress: () => alert('Statistics - This feature will be implemented soon!'),
    },
    {
      title: 'Settings',
      subtitle: 'App preferences and configuration',
      icon: 'gearshape.fill',
      onPress: () => alert('Settings - This feature will be implemented soon!'),
    },
    {
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      icon: 'questionmark.circle.fill',
      onPress: () => alert('Help & Support - This feature will be implemented soon!'),
    },
    {
      title: 'About',
      subtitle: 'App version and information',
      icon: 'info.circle.fill',
      onPress: () => alert('About - Fuar CRM v1.0.0\nBuilt with React Native and Firebase'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userProfile?.displayName
                ? userProfile.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
                : user?.email?.[0].toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.displayName}>
              {userProfile?.displayName || 'User'}
            </Text>
            <Text style={styles.email}>{user?.email}</Text>
            <View style={styles.userTypeBadge}>
              <Text style={styles.userTypeText}>
                {userProfile?.userType === 'exhibitor' ? 'Exhibitor' : 'Visitor'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuIcon}>
                <IconSymbol name={item.icon as any} size={24} color="#007AFF" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, loading && styles.logoutButtonDisabled]}
          onPress={handleLogout}
          disabled={loading}
        >
          <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color="white" />
          <Text style={styles.logoutButtonText}>
            {loading ? 'Logging out...' : 'Logout'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  profileCard: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  userTypeBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  userTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
    textTransform: 'uppercase',
  },
  menuContainer: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutButtonDisabled: {
    backgroundColor: '#ccc',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
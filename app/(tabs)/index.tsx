import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/contexts/AuthContext';
import { Contact } from '@/types';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContactsScreen() {
  const { userProfile } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for now - will be replaced with Firebase integration
  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchQuery]);

  const loadContacts = async () => {
    setLoading(true);
    // TODO: Replace with actual Firebase data loading
    setTimeout(() => {
      setContacts([
        {
          id: '1',
          userId: 'user1',
          firstName: 'John',
          lastName: 'Doe',
          company: 'Tech Corp',
          email: 'john@techcorp.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          userId: 'user1',
          firstName: 'Jane',
          lastName: 'Smith',
          company: 'Design Studio',
          email: 'jane@designstudio.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const filterContacts = () => {
    if (!searchQuery.trim()) {
      setFilteredContacts(contacts);
      return;
    }

    const filtered = contacts.filter(contact => 
      contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadContacts();
    setRefreshing(false);
  };

  const handleAddContact = () => {
    Alert.alert('Add Contact', 'This feature will be implemented soon!');
  };

  const handleContactPress = (contact: Contact) => {
    Alert.alert('Contact Details', `Viewing details for ${contact.firstName} ${contact.lastName}`);
  };

  const renderContact = ({ item }: { item: Contact }) => (
    <TouchableOpacity style={styles.contactItem} onPress={() => handleContactPress(item)}>
      <View style={styles.contactAvatar}>
        <Text style={styles.avatarText}>
          {item.firstName[0]}{item.lastName[0]}
        </Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.contactCompany}>{item.company}</Text>
        {item.email && (
          <Text style={styles.contactEmail}>{item.email}</Text>
        )}
      </View>
      <IconSymbol name="chevron.right" size={16} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contacts</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
          <IconSymbol name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <IconSymbol name="magnifyingglass" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredContacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <IconSymbol name="person.2" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No contacts found</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery ? 'Try adjusting your search' : 'Add your first contact to get started'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  contactCompany: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  contactEmail: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/contexts/AuthContext';
import { Message } from '@/types';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MessagesScreen() {
  const { userProfile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for now - will be replaced with Firebase integration
  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    // TODO: Replace with actual Firebase data loading
    setTimeout(() => {
      setMessages([
        {
          id: '1',
          userId: 'user1',
          contactId: 'contact1',
          recipientEmail: 'john@techcorp.com',
          recipientName: 'John Doe',
          subject: 'Meeting Follow-up',
          content: 'Thank you for the great meeting today...',
          type: 'contact',
          status: 'sent',
          sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          createdAt: new Date(),
        },
        {
          id: '2',
          userId: 'user1',
          recipientEmail: userProfile?.email || 'user@example.com',
          subject: 'Contact Information - Jane Smith',
          content: 'Here are the details for Jane Smith from Design Studio...',
          type: 'self',
          status: 'sent',
          sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          createdAt: new Date(),
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMessages();
    setRefreshing(false);
  };

  const handleMessagePress = (message: Message) => {
    Alert.alert('Message Details', `Viewing message: ${message.subject}`);
  };

  const handleComposeMessage = () => {
    Alert.alert('Compose Message', 'This feature will be implemented soon!');
  };

  const formatDate = (date: Date | any) => {
    const dateObj = date instanceof Date ? date : date.toDate();
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <TouchableOpacity style={styles.messageItem} onPress={() => handleMessagePress(item)}>
      <View style={styles.messageIcon}>
        <IconSymbol 
          name={item.type === 'self' ? 'square.and.arrow.down' : 'square.and.arrow.up'} 
          size={24} 
          color={item.type === 'self' ? '#34C759' : '#007AFF'} 
        />
      </View>
      <View style={styles.messageInfo}>
        <View style={styles.messageHeader}>
          <Text style={styles.messageType}>
            {item.type === 'self' ? 'To Self' : 'To Contact'}
          </Text>
          <Text style={styles.messageTime}>
            {formatDate(item.sentAt)}
          </Text>
        </View>
        <Text style={styles.recipientEmail}>
          {item.recipientEmail}
        </Text>
        <Text style={styles.messageSubject} numberOfLines={1}>
          {item.subject}
        </Text>
        <Text style={styles.messageContent} numberOfLines={2}>
          {item.content}
        </Text>
        <View style={styles.messageStatus}>
          <View style={[
            styles.statusDot,
            { backgroundColor: item.status === 'sent' ? '#34C759' : '#FF9500' }
          ]} />
          <Text style={styles.statusText}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity style={styles.composeButton} onPress={handleComposeMessage}>
          <IconSymbol name="square.and.pencil" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <IconSymbol name="envelope" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No messages yet</Text>
            <Text style={styles.emptySubtext}>
              Send your first message to get started
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
  composeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  messageItem: {
    flexDirection: 'row',
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
  messageIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  messageInfo: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
  },
  recipientEmail: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  messageSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  messageContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  messageStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
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
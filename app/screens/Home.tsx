import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import useAuthStore from '../store/useAuthStore';
import api from '../utility/apiService';

type User = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  picture: {
    thumbnail: string;
    medium: string;
    large: string;
  };
  dob: {
    age: number;
  };
};

const Home = () => {
  const navigation = useNavigation();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onLogout = () => {
  setLoggedIn(false);
};

  useEffect(() => {
    registerForPushNotificationsAsync();
    fetchUsers();
  }, []);

  const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
    }
};

const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));

const onBellPress = () => {
  scale.value = withSequence(
    withTiming(1.3, { duration: 150 }),
    withSpring(1, { stiffness: 200, damping: 10 })
  );

  handleNotification();
};

const handleNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🔔 You pressed the bell!',
      body: 'This is a local push notification.',
    },
    trigger: null, // fire immediately
  });
};



  const fetchUsers = async (results: number = 10) => {
    setLoading(true);
    try {
      const response = await api.get(`/?results=${results}`);
      setUsers(response.data.results);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUsers();
  }, []);

  const renderUserCard = ({ item }: { item: User }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.picture.large }}
        style={styles.avatar}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.name}>{`${item.name.first} ${item.name.last}`}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
        <Text style={styles.age}>Age: {item.dob.age}</Text>
      </View>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No users found.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
  <Text style={styles.headerTitle}>Home Screen</Text>

  <View style={styles.iconRow}>
    <TouchableWithoutFeedback onPress={onBellPress}>
      <Animated.View style={animatedStyle}>
        <Ionicons name="notifications-outline" size={24} color="#007AFF" />
      </Animated.View>
    </TouchableWithoutFeedback>

    <TouchableWithoutFeedback onPress={onLogout}>
      <View style={styles.logoutIcon}>
        <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
      </View>
    </TouchableWithoutFeedback>
  </View>
</View>

      {loading && users.length === 0 ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={users}
          keyExtractor={(item, index) => item.email + index}
          renderItem={renderUserCard}
          ListEmptyComponent={renderEmptyComponent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    backgroundColor: '#ccc',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  age: {
    fontSize: 14,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 16,
    color: '#aaa',
  },
  header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: 48, // for status bar
  paddingBottom: 12,
  paddingHorizontal: 16,
  backgroundColor: '#fff',
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
},
headerTitle: {
  fontSize: 20,
  fontWeight: '600',
  color: '#333',
},
iconRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 16, // space between icons
},
logoutIcon: {
  marginLeft: 16,
},
});

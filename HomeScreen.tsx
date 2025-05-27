import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import useAuth from './hooks/useAuth';

const HomeScreen = () => {
  const user = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home!</Text>
      <Text style={styles.email}>{user?.email ?? 'No email'}</Text>
      <Button title="Sign Out" onPress={() => auth().signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
    marginBottom: 24,
  },
});

export default HomeScreen;

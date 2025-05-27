import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import useAuth from './hooks/useAuth';

function SignAndSignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [signedOutMessage, setSignedOutMessage] = useState('');
  const user = useAuth();

  useEffect(() => {
    if (user) {
      setSignedOutMessage('');
    }
  }, [user]);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Please enter both email and password');
      return;
    }
    

    try {
      if (isSignUp) {
        await auth().createUserWithEmailAndPassword(email, password);
        Alert.alert('Success', 'Account created and signed in!');
      } else {
        await auth().signInWithEmailAndPassword(email, password);
        Alert.alert('Success', 'Signed in successfully!');
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert('Authentication Failed', error.message);
    }
      
  };
  
  const signOut = async () => {
    try {
      await auth().signOut();
      console.log('User signed out!');
      setSignedOutMessage('You have been signed out.');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
  };

  // Show welcome and sign out if user is signed in
  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, {user.email ?? 'User'}!</Text>
        <Button title="Sign Out" onPress={signOut} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {signedOutMessage ? (
        <Text style={{ color: 'green', textAlign: 'center', marginBottom: 16 }}>
          {signedOutMessage}
        </Text>
      ) : null}
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title={isSignUp ? 'Create Account' : 'Login'}
        onPress={handleAuth}
      />

      <TouchableOpacity onPress={toggleMode}>
        <Text style={styles.switchText}>
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  switchText: {
    marginTop: 16,
    color: '#007bff',
    textAlign: 'center',
  },
});

export default SignAndSignUp;

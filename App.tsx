import React,{useState,useEffect} from 'react';
 import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';

  
function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<{email: string | null} | null>(null);

  function handleAuthStateChanged(user: {email: string | null} | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

   useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser({ email: user.email });
      } else {
        setUser(null);
      }
      if (initializing) setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

   if (initializing) return null;
    if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }
   return (
    <View style={{ flex: 1, backgroundColor: 'red',justifyContent: 'center', alignItems: 'center',padding:22 }}>
       <Text>Welcome {user.email ?? "User"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

import React from "react";
import {Text,View,StyleSheet} from "react-native";

function A(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
      <Text style={styles.text}>Welcome to React Native!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  text: {
    fontSize: 20,
    color: "#333",
    marginBottom: 10,
  },
});
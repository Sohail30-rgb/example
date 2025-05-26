import React from "react";
import {Text,View,StyleSheet} from "react-native";

function A(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>H</Text>
      <Text style={styles.text}>Welcom</Text>
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
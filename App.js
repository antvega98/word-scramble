import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  const [alphabet, setAlphabet] = useState("abcdefghijklmnopqrstuvwxyz");

  const scrambleAlphabet = () => {
    const arr = [...alphabet];
    const scrambled = [];
    while (arr.length > 0) {
      arr.swap(arr, getRandomIndex(arr.length), arr.length - 1);
      scrambled.push(arr.pop());
    }
    setAlphabet(scrambled.join(""));
  };

  const getRandomIndex = (len) => {
    return Math.floor(Math.random() * len);
  };

  const swap = (arr, i, j) => {
    const copy = arr[i];
    arr[i] = arr[j];
    arr[j] = copy;
  };

  return (
    <View style={styles.container}>
      <Text>Alphabet: 'abcdefghijklmnopqrstuvwxyz'</Text>
      <Text>Scrambled Alphabet: {alphabet}</Text>
      <TouchableOpacity
        style={styles.scrambleButton}
        onPress={() => {
          scrambleAlphabet();
        }}
      >
        <Text style={{ fontSize: 18 }}>Scramble</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrambleButton: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "lightblue",
  },
});

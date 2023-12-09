import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

const scrambleWord = (word) => {
  const arr = [...word];
  const scrambled = [];
  while (arr.length > 0) {
    swap(arr, getRandomIndex(arr.length), arr.length - 1);
    scrambled.push(arr.pop());
  }
  return scrambled.join("");
};

const getRandomIndex = (len) => {
  return Math.floor(Math.random() * len);
};

const swap = (arr, i, j) => {
  const copy = arr[i];
  arr[i] = arr[j];
  arr[j] = copy;
};

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);
  const [words, setWords] = useState([
    "hello",
    "world",
    "python",
    "javascript",
    "apple",
    "amazon",
    "facebook",
    "google",
  ]);

  const getRandomWord = () => {
    const randomIndex = getRandomIndex(words.length);
    if (words.length > 0) {
      swap(words, randomIndex, words.length - 1);
      const newWord = words.pop();
      setCurrentWord(newWord);
      setScrambledWord(scrambleWord(newWord));
    } else {
      setCurrentWord("Game over!");
    }
  };

  return (
    <View style={styles.container}>
      {guessedCorrectly === false ? (
        <>
          <Text>Word: {scrambledWord}</Text>
          <TextInput
            value={userInput}
            placeholder="Type something here."
            onChangeText={(value) => {
              if (value.toLowerCase() === currentWord) {
                setGuessedCorrectly(true);
              }
              setUserInput(value);
            }}
            style={{
              borderColor: "grey",
              width: "80%",
              padding: 10,
              borderWidth: 1,
              borderRadius: 15,
            }}
          />
        </>
      ) : (
        <Text>You guessed correctly!</Text>
      )}

      <TouchableOpacity
        style={styles.scrambleButton}
        onPress={() => {
          getRandomWord();
          setUserInput("");
          setGuessedCorrectly(false);
        }}
      >
        <Text style={{ fontSize: 18 }}>Display Random Word</Text>
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

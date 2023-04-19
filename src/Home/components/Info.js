import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../utils/colors";

export const Info = () => {
  const word = useSelector((state) => state.word.word);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.mainText}>Welcome to Item Hunter!</Text>
        <Text style={styles.text}>
          The objective of the game is to find items around you. You can browse
          and select items from the "Item Selector" tab from the drawer menu on
          the right.
        </Text>
        <Text style={styles.text}>
          When you find your selected item, tap the "Check!" button on the top
          right and the AI will take a look at it to confirm you get a point!
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.currentWord}>Current word:</Text>
        <Text style={styles.dynamicText}>
          {word ? word : "No item selected."}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.grey,
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grey,
    flex: 1,
  },
  mainText: {
    fontSize: 22,
    marginTop: 30,
    marginBottom: 10,
    textShadowColor: colors.midGrey,
    textShadowRadius: 2,
    textShadowOffset: { width: 2, height: 2 },
  },
  text: {
    color: colors.dark,
    fontSize: 16,
    margin: 20,
    textAlign: "center",
  },
  currentWord: {
    fontSize: 18,
    marginBottom: 10,
  },
  dynamicText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

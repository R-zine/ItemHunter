import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, Alert, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { items } from "../utils/items";
import { updateList } from "../store/actions/wordList";
import { updateWord } from "../store/actions/word";
import { colors } from "../utils/colors";

export function PredictionList({ predictions = [], isOver }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const dispatch = useDispatch();

  const list = useSelector((state) => state.list.list);

  const word = useSelector((state) => state.word.word);
  const rightAnswer = items[word];
  const predictionsWords = predictions.map((pred) => pred.className);
  const outcome = rightAnswer.some((item) => predictionsWords.includes(item));

  useEffect(() => {
    if (outcome) {
      setIsCorrect(true);

      setTimeout(() => {
        setModalVisible(true);
      }, 1000);
    }
  }, [outcome]);

  if (predictions.length == 0) return null;

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Good job on finding {word}!</Text>
          <Button
            color={colors.red}
            title="Item Selector"
            onPress={() => {
              isOver(true);
              dispatch(updateWord(""));
              dispatch(updateList([...list, word]));
            }}
          />
        </View>
      </Modal>
      <Text style={styles.predictionsText}>
        {isCorrect ? "Good job!" : "Identifying..."}
      </Text>
    </View>
  );
}

const margin = 24;

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    position: "absolute",
    bottom: margin,
    left: margin,
    right: margin,
    backgroundColor: colors.grey,
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
    flex: 1,
  },
  text: {
    paddingVertical: 2,
    fontSize: 20,
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    paddingTop: 70,
    backgroundColor: colors.grey,
  },
  modalText: { fontSize: 24, color: colors.dark },

  predictionsText: {
    color: colors.light,
  },
});

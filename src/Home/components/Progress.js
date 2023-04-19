import { StyleSheet, Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { items } from "../../utils/items";
import { clearList } from "../../store/actions/wordList";
import { colors } from "../../utils/colors";

export const Progress = () => {
  const list = useSelector((state) => state.list.list);

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.itemsFound}>Items found:</Text>
      <Text style={styles.conter}>
        {list.length} / {Object.keys(items).length}
      </Text>
      <Button
        color={colors.red}
        title="Reset progress"
        onPress={() => dispatch(clearList(""))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  itemsFound: {
    fontSize: 18,
    color: colors.dark,
    marginBottom: 10,
  },
  conter: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 30,
  },
});

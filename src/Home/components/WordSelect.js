import { useState, useMemo } from "react";
import { StyleSheet, TextInput, View, FlatList, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateWord } from "../../store/actions/word";
import { items } from "../../utils/items";
import { colors } from "../../utils/colors";

export const WordSelect = ({ navigation }) => {
  const [search, setSearch] = useState("");

  const list = useSelector((state) => state.list.list);

  const itemNames = Object.keys(items);
  const filteredItems = useMemo(
    () => itemNames.filter((item) => item.includes(search.toLowerCase())),
    [search]
  );

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setSearch}
        value={search}
        placeholder="Search for an item"
        keyboardType="web-search"
        cursorColor={colors.light}
        placeholderTextColor={colors.light}
      />
      <FlatList
        data={filteredItems.filter((item) => !list.includes(item))}
        style={{ width: "100%" }}
        renderItem={({ item }) => (
          <Button
            color={colors.yellow}
            title={item}
            onPress={() => {
              dispatch(updateWord(item));
              navigation.navigate("Info");
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    alignItems: "center",
  },
  input: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    borderColor: colors.light,
    borderWidth: 2,
    width: "90%",
    borderRadius: 5,
    color: colors.light,
  },
});

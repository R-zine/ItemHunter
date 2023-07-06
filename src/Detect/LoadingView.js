import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/colors";

export function LoadingView({ children, message = "", column }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: column ? "column" : "row", padding: 5 }}>
        {!!message && <Text style={styles.text}>{message}</Text>}
        {children}
        <ActivityIndicator />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grey,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginRight: 8,
    color: colors.light,
  },
});

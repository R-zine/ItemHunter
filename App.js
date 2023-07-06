import "react-native-gesture-handler";
import { Camera } from "expo-camera";
import { Button, Text } from "react-native";

import { LoadingView, ModelView, useTensorFlowLoaded } from "./src/Detect";
import { Home } from "./src/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./src/store/state/store";

import { colors } from "./src/utils/colors";

export default function App() {
  const isLoaded = useTensorFlowLoaded();
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const Stack = createStackNavigator();

  if (!permission?.granted) {
    return (
      <LoadingView
        column
        message="This app needs camera permission to validate the items you haveve found."
      >
        <Button
          color={colors.red}
          title="Grant permission"
          onPress={requestPermission}
        />
      </LoadingView>
    );
  }

  if (!isLoaded) {
    return <LoadingView message="Loading AI engine" />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <Stack.Navigator
            cardOverlayEnabled={true}
            screenOptions={{
              headerMode: "screen",
              headerTintColor: colors.light,
              headerStyle: {
                backgroundColor: colors.dark,
              },
            }}
          >
            <Stack.Screen
              name="Menu"
              component={Home}
              options={({ navigation }) => ({
                headerTitle: (props) => <Text {...props}>Item Hunter</Text>,
                headerTitleStyle: { color: colors.light, fontSize: 18 },
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate("Detect!")}
                    title="Check >"
                    color={colors.light}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Detect!"
              component={ModelView}
              options={({ navigation }) => ({
                headerTitle: (props) => <Text {...props}>Detecting...</Text>,
                headerTitleStyle: { color: colors.light, fontSize: 18 },
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

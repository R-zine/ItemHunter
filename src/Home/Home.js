import { StyleSheet, Text, View, Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Info, WordSelect, Progress } from "./components/";
import { colors } from "../utils/colors";
import Svg, { Path } from "react-native-svg";

const Icon = () => (
  <Svg viewBox="0 0 448 512">
    <Path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
  </Svg>
);

export const Home = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.green,
        },
        drawerActiveTintColor: colors.red,
        drawerInactiveTintColor: colors.dark,
        drawerInactiveBackgroundColor: colors.yellow,
        drawerStyle: {
          backgroundColor: colors.green,
          width: 240,
        },
      }}
    >
      <Drawer.Screen
        name="Info"
        options={() => ({
          headerTitle: (props) => <Text {...props}>Info</Text>,
          headerTitleStyle: { color: colors.red, fontSize: 20 },
          headerTintColor: colors.red,
        })}
        component={Info}
      />
      <Drawer.Screen
        name="Progress"
        options={() => ({
          headerTitle: (props) => <Text {...props}>Your progress</Text>,
          headerTitleStyle: { color: colors.red, fontSize: 20 },
          headerTintColor: colors.red,
        })}
        component={Progress}
      />
      <Drawer.Screen
        name="Item Selector"
        options={() => ({
          headerTitle: (props) => <Text {...props}>Item Selector</Text>,
          headerTitleStyle: { color: colors.red, fontSize: 20 },
          headerTintColor: colors.red,
        })}
        component={WordSelect}
      />
    </Drawer.Navigator>
  );
};

import { Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Info, WordSelect, Progress } from "./components/";
import { colors } from "../utils/colors";

export const Home = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.green,
        },
        drawerActiveTintColor: colors.yellow,
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
          headerTitleStyle: { color: colors.yellow, fontSize: 20 },
          headerTintColor: colors.red,
        })}
        component={Info}
      />
      <Drawer.Screen
        name="Progress"
        options={() => ({
          headerTitle: (props) => <Text {...props}>Your progress</Text>,
          headerTitleStyle: { color: colors.yellow, fontSize: 20 },
          headerTintColor: colors.red,
        })}
        component={Progress}
      />
      <Drawer.Screen
        name="Item Selector"
        options={() => ({
          headerTitle: (props) => <Text {...props}>Item Selector</Text>,
          headerTitleStyle: { color: colors.yellow, fontSize: 20 },
          headerTintColor: colors.red,
        })}
        component={WordSelect}
      />
    </Drawer.Navigator>
  );
};

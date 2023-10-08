import { useTheme } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Recipe } from "../pages/Recipe";
import { RecipeList } from "../subpages/RecipeList";
import { DetailedRecipe } from "../subpages/DetailedRecipe";
import { Home } from "../pages/Home";
import { Settings } from "../pages/Settings";
import { AboutLefty } from "../subpages/AboutLefty";
import { CameraScan } from "../subpages/CameraScan";
import { CameraLanding } from "../subpages/CameraLanding";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  const theme = useTheme();
  theme.colors.onSecondaryContainer = "transparent";

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "transparent",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          borderColor: "transparent",
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: theme.colors.tertiary,
      }}
    >
      <Tab.Screen
        name="Recipe"
        component={Recipe}
        options={{
          tabBarLabel: "Recipes",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chef-hat" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export function BottomNav() {
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      <Stack.Screen
        name="HomeStack"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailedRecipe"
        component={DetailedRecipe}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AboutLefty"
        component={AboutLefty}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipeList"
        component={RecipeList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Camera"
        component={CameraScan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CameraLanding"
        component={CameraLanding}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    //
  );
}

import React from "react";
import { StyleSheet, Text, View, Button, Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from "@react-navigation/stack";
import { useIsFocused } from "@react-navigation/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from "./screens/HomeScreen";
import QRScreen from "./screens/QRScreen";
import VoiceScreen from "./screens/VoiceScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import ProfileScreen from "./screens/ProfileScreen";

import ShowAllRoomsScreen from "./screens/ShowAllRoomsScreen";
import DetailRoomScreen from "./screens/DetailRoomScreen";
import CalendarScreen from "./screens/CalendarScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const HomeStackNavigator = ({ navigation, route }) => {
  const routeName = route.state ?
    route.state.routes[route.state.index].name : 'Home';

  if (route.state) {
    navigation.setOptions({

      // tabBarVisible: route.state.index > 1 ? false : true
      tabBarVisible: routeName === "DetailRoom" || routeName === "Calendar"  ? false : true
    })
  }
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}
      // headerMode="float"
      animation="fade"
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="ShowAllRooms" component={ShowAllRoomsScreen} />
      <HomeStack.Screen name="DetailRoom" component={DetailRoomScreen}
        options={
          { tabBarVisible: false }
        } />
      <HomeStack.Screen name="Calendar" component={CalendarScreen}
        options={
          { tabBarVisible: false }
        } />


    </HomeStack.Navigator>
  );

}
const HomeTabNavigator = ({ navigation, route }) => {
  return (
    <Tab.Navigator

      initialRouteName="HomeStack"
      activeColor="#adc"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name == "Home") {
            iconName = "home";
          } else if (route.name == "QR") {
            iconName = "qrcode";
          } else if (route.name == "Voice") {
            iconName = "microphone";
          } else if (route.name == "Favorite") {
            iconName = "heart";
          } else if (route.name == "Profile") {
            iconName = "user-circle";
          }
          return <Icon name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="QR" component={QRScreen} />
      <Tab.Screen
        // options={{
        //   tabBarLabel: '',
        // }}
        name="Voice"
        component={VoiceScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}


function isHeaderShown(route) {
  const routeName = route.state ?
    route.state.routes[route.state.index].name
    : 'Home';
  switch (routeName) {
    case "Home":
      return false;
  }
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      >
        <Stack.Screen
          name="Home" component={HomeTabNavigator}
          options={({ route }) => ({
            // title: getHeaderTitle(route),
            headerShown: false
          })} />
        {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
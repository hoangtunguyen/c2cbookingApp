import React from "react";
import { StyleSheet, Text, View, Button, Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from "@react-navigation/stack";
import { useIsFocused } from "@react-navigation/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const HomeScreen = ({ navigation }) => {
  navigation.setOptions({
    headerRight: () => (
      <Button
        title="Save"
        onPress={() => {
          //save the changes
          navigation.replace("Home");
        }}
      />
    )
  });
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>HomeScreen</Text>
      <Button title="Go To Details Screen !!" onPress={() => navigation.navigate("Details")} />
    </View>
  );
};
const DetailsScreen = () =>{
  return(
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>DetailsScreen</Text>
    </View>
  );
}

const HomeStackNavigator = ({navigation, route}) =>{
  if(route.state){
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true
    })
  }
  return(
    <HomeStack.Navigator
    screenOptions={{
      gestureEnabled: true,
      gestureDirection: "horizontal",
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS

    }}
    headerMode="float"
    animation="fade"
    >
      <HomeStack.Screen name="Home" component={HomeScreen}/>
      <HomeStack.Screen name="Details" component={DetailsScreen}/>
    </HomeStack.Navigator>
  );
}

const SettingsScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: isFocused ? "green" : "black" }}>SettingsScreen</Text>
      <Button title="Go To Home Screen" onPress={() => navigation.goBack()} />
    </View>
  );
};
function FeedScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>FeedScreen!</Text>
    </View>
  );
}

const HomeTabNavigator = ({navigation, route}) => {
  // navigation.setOptions({headerTitle: getHeaderTitle(route)});
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name == "Home") {
            iconName = "home";
          } else if (route.name == "Feed") {
            iconName = "home";
          } else if (route.name == "Settings") {
            iconName = "user-circle";
          }
          return <Icon name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
function getHeaderTitle(route) {
  const routeName = route.state ?
    route.state.routes[route.state.index].name
    : 'Home';
  switch (routeName) {
    case "Home":
      return "Homess";
    case "Feed":
      return "Feed";
    case "Settings":
      return "Settings";
  }
}

function isHeaderShown(route){
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
        // screenOptions={{
        //   gestureEnabled: true,
        //   gestureDirection: "horizontal",
        //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS

        // }}
        // headerMode="float"
        // animation="fade"
      >
        <Stack.Screen
          options={({ route }) => ({
            title: getHeaderTitle(route),
            headerShown: isHeaderShown(route)
          })} 
          name="Home" component={HomeTabNavigator} />
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
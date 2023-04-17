import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../../screens/home/home";
import { Messaging } from "../../screens/messaging/messaging";


const Stack = createStackNavigator();

export const HomeNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Message" component={Messaging} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

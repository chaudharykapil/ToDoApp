import React from 'react';
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator, HeaderTitle} from "@react-navigation/stack"
import { StyleSheet,View } from 'react-native';
import {Provider as PaperProvider, Title} from "react-native-paper"
import AddToDo from "./src/AddToDo"
import ShowGoals from './src/ShowGoals';
import HomePage from './src/HomePage';
import HomeScreen from "./src/HomeScreen"
export default function App() {
  const Stack = createStackNavigator()
  return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator headerMode = {false} initialRouteName = "HomeScreen">
          <Stack.Screen name = "HomeScreen"  component = {HomeScreen} />
            <Stack.Screen name = "AddToDo"  component = {AddToDo} />
            <Stack.Screen name = "ShowGoals"  component = {ShowGoals} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

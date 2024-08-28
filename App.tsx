import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/preAuth/screens/Login';
import Register from './src/preAuth/screens/Register';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} 
      options={{headerShown:false}}
      />
      <Stack.Screen name="Register" component={Register}
        options={{headerShown:false}}
       />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})
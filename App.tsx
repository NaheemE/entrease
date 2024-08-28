import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/preAuth/screens/Login';
import Register from './src/preAuth/screens/Register';
import Home from './src/postAuth/screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from './src/config/colors';
import History from './src/postAuth/screens/History';
import Profile from './src/postAuth/screens/Profile';
import Icon from 'react-native-vector-icons/Entypo';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: styles.tabNav,
      tabBarLabelStyle: {
        fontSize: 12, marginBottom: 10,
      },
      tabBarIconStyle: {
        marginTop: 8,
      },
      tabBarInactiveTintColor: 'white',
      tabBarActiveTintColor: '#3cdfff'
    }} >
      <Tab.Screen name="Home" component={Home} options={{
        headerShown: false, tabBarIcon: ({ focused }) => (<Icon name='home' size={30} color={focused ? '#3cdfff' : 'white'} />
        )
      }} />
      <Tab.Screen name='History' component={History} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  );
};


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={Register} /> */}
        <Stack.Screen
          name="HomeTabs"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  tabNav: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 70,
  }
})
import {StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import Login from './src/preAuth/screens/Login'
import Register from './src/preAuth/screens/Register'
import Home from './src/postAuth/screens/Home'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Colors} from './src/config/colors'
import History from './src/postAuth/screens/History'
import Profile from './src/postAuth/screens/Profile'
import Icon from 'react-native-vector-icons/Entypo'
import FAIcons from 'react-native-vector-icons/FontAwesome6'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserContext from './src/Contexts/UserContext'
import {ActivityIndicator, MD2Colors} from 'react-native-paper'
import ViewDetails from './src/postAuth/screens/ViewDetails'
import SharedDetails from './src/postAuth/screens/SharedDetails'
import EditProfile from './src/postAuth/screens/EditProfile'
import QRcode from './src/postAuth/screens/QRcode'
import QRscan from './src/postAuth/screens/QRscan'
import AfterScanning from './src/postAuth/screens/AfterScanning'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const getCurrentUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user')

      const users = jsonValue != null ? JSON.parse(jsonValue) : null
      setUser(users)
      // console.log(user);
    } catch (e) {
      console.error('Failed to fetch the user.', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  useEffect(() => {
    // console.log('User state updated:', user);
  }, [user])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color={MD2Colors.blue500} />
      </View>
    )
  }
  return (
    <UserContext>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={user === null ? 'Login' : 'HomeTabs'}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomeTabs"
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ViewDetails"
            component={ViewDetails}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: 'white',
              headerTitle: '',
            }}
          />
          <Stack.Screen
            name="sharedDetails"
            component={SharedDetails}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: 'white',
              headerTitle: '',
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: 'white',
              headerTitle: '',
            }}
          />

          <Stack.Screen
            name="QRcode"
            component={QRcode}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: 'white',
              headerTitle: '',
            }}
          />

          <Stack.Screen
            name="QRscan"
            component={QRscan}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: 'white',
              headerTitle: '',
            }}
          />

          <Stack.Screen
            name="AfterScan"
            component={AfterScanning}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: 'white',
              headerTitle: '',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext>
  )
}
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabNav,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 10,
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: '#3cdfff',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Icon name="home" size={28} color={focused ? '#3cdfff' : 'white'} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FAIcons
              name="users-viewfinder"
              size={28}
              color={focused ? '#3cdfff' : 'white'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Icon name="user" size={28} color={focused ? '#3cdfff' : 'white'} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
  tabNav: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 70,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

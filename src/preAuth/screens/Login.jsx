import {
  Alert,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import {useForm, Controller} from 'react-hook-form'
import firestore from '@react-native-firebase/firestore'
import logo from '../../images/Entries.png'
import CostomInput from '../components/CostomInput'
import {Colors} from '../../config/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { registerResponseContext } from '../../Contexts/UserContext'
import { CommonActions } from '@react-navigation/native'

export default function Login({navigation}) {
  const {registerResponse,setRegisterResponse}=useContext(registerResponseContext)
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm()
  const [users, setUsers] = useState()

  const onLoginPressed = async data => {
    const currentUser = users.find(
      item =>
        item._data.email == data.email && item._data.password == data.password,
    )
    const docId = currentUser._ref._documentPath._parts[1]
    console.log(docId)

    if (currentUser) {
      try {
        const docId = currentUser._ref._documentPath._parts[1]

        const userObject = {
          ...currentUser._data,
          docId: docId,
        }

        await AsyncStorage.setItem('@user', JSON.stringify(userObject))
        console.log('User stored successfully')
      } catch (e) {
        console.error('Failed to store the user.', e)
      }
      reset()
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'HomeTabs' }], 
        })
      );
    } else {
      Alert.alert('User not found')
    }
  }

  const getUsers = async () => {
    try {
      const user = await firestore().collection('Users').get()
      setUsers(user._docs)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getUsers()
  }, [registerResponse])

  return (
    <ScrollView style={styles.loginContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={{marginTop: 300, alignItems: 'center'}}>
            <Image source={logo} style={{width: 170, height: 50}} />
          </View>
          <View style={{padding: 20}}>
            <CostomInput
              name="email"
              label="Email"
              control={control}
              rules={{required: 'Email is required'}}
            />
            <CostomInput
              name="password"
              label="Password"
              secureTextEntry={true}
              control={control}
              rules={{required: 'Password is required'}}
            />
            <TouchableOpacity
              onPress={handleSubmit(onLoginPressed)}
              style={{
                backgroundColor: Colors.primary,
                height: 50,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
                Login
              </Text>
            </TouchableOpacity>
            <View>
              <Text
                style={{textAlign: 'center', marginTop: 20, marginBottom: 10}}>
                Don't have an Entries account ?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={{
                  backgroundColor: Colors.secondary,
                  height: 50,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 17, fontWeight: '400'}}>
                  Create account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
})

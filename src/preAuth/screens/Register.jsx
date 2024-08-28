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
} from 'react-native';
import React, { useState } from 'react';
import logo from '../../images/Entries.png'
import CostomInput from '../components/CostomInput';
import { useForm, Controller } from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import { db } from '../../config/firebaseConfig';


export default function Register({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const pwd = watch('password')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/;

  const onRegisterClicked = (data) => {
    firestore()
      .collection('Users')
      .add(data)
      .then(() => {
        console.log('User added!');
        Alert.alert("Account created successfully")
      });
  };

  return (
    <ScrollView style={styles.loginContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={{ marginTop: 50, alignItems: 'center' }}>
            <Image source={logo} style={{ width: 170, height: 50 }} />
          </View>
          <View style={{ padding: 20 }}>
            <CostomInput
              name="username"
              label="Username"
              control={control}
              rules={{
                required: 'Username is required',
                minLength: { value: 3, message: 'Username must be 3 charectors' },
                maxLength: {
                  value: 20,
                  message: 'Username not longer than 20 charectors',
                },
              }}
            />
            <CostomInput
              name="email"
              label="Email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: { value: emailRegex, message: 'Invalid format' },
              }}
            />
            <CostomInput
              name="phone"
              label="Phone"
              control={control}
              rules={{
                required: 'Phone no is required',
                pattern: { value: phoneRegex, message: 'Invalid format' }
              }}
            />
            <CostomInput
              name="password"
              label="Password"
              secureTextEntry={true}
              control={control}
              rules={{
                required: 'Password is required',
                minLength: { value: 4, message: 'Password must be 4 charectors' },
                maxLength: {
                  value: 15,
                  message: 'Password not longer than 15 charectors',
                },
              }}
            />
            <CostomInput
              name="confpassword"
              label="Confirm Password"
              secureTextEntry={true}
              control={control}
              rules={{
                required: 'Confirm Password is required',
                validate: value => value === pwd || "Password do no match"
              }}
            />
            <TouchableOpacity
              onPress={handleSubmit(onRegisterClicked)}
              style={{
                backgroundColor: '#0075FF',
                height: 50,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
                Register
              </Text>
            </TouchableOpacity>
            <View>
              <Text
                style={{ textAlign: 'center', marginTop: 20, marginBottom: 10 }}>
                Already have an Entries account ?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{
                  backgroundColor: '#8F00FF',
                  height: 50,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ color: 'white', fontSize: 17, fontWeight: '400' }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

import {Alert, Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import logo from '/Faircode/entrease/src/images/Entries.png';
import CostomInput from '../components/CostomInput';
import {useForm, Controller} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';


export default function Login({navigation}) {
  const {control, handleSubmit,formState:{errors}} = useForm();
  const [users,setUsers]=useState()
  

  const onLoginPressed = (data) => {
    console.log(data);
    const currentUser=users.find(item=>item._data.email==data.email&&item._data.password==data.password)    
    if(currentUser){
      Alert.alert("Login successfully")
    }
    else{
      Alert.alert("User not found")
    }
  };

  const getUsers=async ()=>{
    try{
      const user = await firestore().collection('Users').get();
      setUsers(user._docs)
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    getUsers()
  },[])
  
  
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
                  rules={{required:"Email is required"}}
                />
                <CostomInput
                  name="password"
                  label="Password"
                  secureTextEntry={true}
                  control={control}
                  rules={{required:"Password is required"}}
                />
                <TouchableOpacity
                  onPress={handleSubmit(onLoginPressed)}
                  style={{
                    backgroundColor: '#0075FF',
                    height: 50,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
                    Login
                  </Text>
                </TouchableOpacity>
                <View>
                  <Text style={{textAlign: 'center', marginTop: 20, marginBottom: 10}}>
                    Don't have an Entries account ?
                  </Text>
                  <TouchableOpacity
                    onPress={()=>navigation.navigate('Register')}
                    style={{
                      backgroundColor: '#8F00FF',
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
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

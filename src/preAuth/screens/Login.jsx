import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import logo from '/Faircode/entrease/src/images/Entries.png'
import CostomInput from '../components/CostomInput'




export default function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

  return (
    <View style={styles.loginContainer}>
        <View
        style={{marginTop:300,alignItems:"center"}}
        >
            <Image
            source={logo}
            style={{width:170,height:50}}
            />
        </View>
        <View style={{padding:20}}>
            <CostomInput label="Email" value={email} onChangeText={text => setEmail(text)} />
            <CostomInput label="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}/>
            <TouchableOpacity style={{backgroundColor:"#0075FF",height:50,borderRadius:5,justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:"white",fontSize:20,fontWeight:"600"}}>Login</Text>
            </TouchableOpacity>
            <View>
                <Text style={{textAlign:"center",marginTop:20,marginBottom:10}}>Don't have an Entries account ?</Text>
                <TouchableOpacity style={{backgroundColor:"#8F00FF",height:50,borderRadius:5,justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:"white",fontSize:17,fontWeight:"400"}}>Create account</Text>
            </TouchableOpacity>

            </View>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    loginContainer:{
        flex:1,
        backgroundColor:"white",
    }
})
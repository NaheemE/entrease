import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import qr from '../../images/qr.png'
import { useNavigation } from '@react-navigation/native'

export default function ShowQr() {
  const navigation=useNavigation()
  const handlePress=()=>{
    navigation.navigate("QRcode")
  }
  return (
    <View>
      <Image source={qr} style={{width: 120, height: 120}} />
      <View style={{paddingHorizontal: 5 }}>
        <TouchableOpacity
        onPress={handlePress}
          style={{
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 7,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white',fontSize:13}}>Show QR</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})

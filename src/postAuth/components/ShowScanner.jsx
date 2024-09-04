import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import scanner from '../../images/scanner.png'
import {useNavigation} from '@react-navigation/native'

export default function ShowScanner() {
  const navigation = useNavigation()
  const handlePress = () => {
    navigation.navigate('QRscan')
  }
  return (
    <View>
      <Image source={scanner} style={{width: 120, height: 120}} />
      <View style={{paddingHorizontal: 5}}>
        <TouchableOpacity
        onPress={handlePress}
          style={{
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 7,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontSize: 13}}>Scanner</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})

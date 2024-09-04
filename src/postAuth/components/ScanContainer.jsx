import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import ShowQr from './ShowQr'
import ShowScanner from './ShowScanner'

export default function ScanContainer() {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flex: 0.8,
        paddingTop: 20,
      }}>
        <View>
          <Text style={{textAlign:"center",fontSize:30,color:"black",fontWeight:"600"}}>Get verified {'\n'} by {'\n'} Entrease</Text>
        </View>
      <View style={{flexDirection: 'row', justifyContent: 'center', gap: 30,marginTop:30}}>
        <ShowQr />
        <ShowScanner />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})

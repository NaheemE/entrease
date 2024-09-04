import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


export default function ScannedYourIdItem() {
    const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ViewDetails'); 
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
        <View style={{height:100,width:"auto",flexDirection:"row",justifyContent:"space-between",paddingHorizontal:20,alignItems:"center"}}>
          <View>
            <Text style={{color:"black",fontSize:17,fontWeight:"500"}}>Jesse Pinkman</Text>
            <Text style={{color:"gray",fontSize:14,marginTop:10}}>ID: 9876453213</Text>
          </View>
          <View>
            <Text style={{color:"black",fontSize:14}}>11/02/2024</Text>
            <Text style={{color:"black",fontSize:14,marginTop:10}}>8:56 PM</Text>
          </View>
        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({})
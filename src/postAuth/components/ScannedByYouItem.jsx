import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { userDeailsContext } from '../../Contexts/UserContext'

export default function ScannedByYouItem({item}) {
  const {userDetails,setUserDetails}=useContext(userDeailsContext)
    const navigation =useNavigation()
    const handlePress=()=>{
        navigation.navigate("sharedDetails",{item})
    }
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
        <View style={{height:100,width:"auto",flexDirection:"row",justifyContent:"space-between",paddingHorizontal:20,alignItems:"center"}}>
          <View>
            <Text style={{color:"black",fontSize:17,fontWeight:"500"}}>{!userDetails.id == item._data.recieverId?item._data.recieverName:item._data.senderName}</Text>
            <Text style={{color:"gray",fontSize:14,marginTop:10}}>{item._data?.recieverId}</Text>
          </View>
          <View>
            <Text style={{color:"black",fontSize:14}}>{item._data?.date}</Text>
            <Text style={{color:"black",fontSize:14,marginTop:10}}>{item._data?.time}</Text>
          </View>
        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({})
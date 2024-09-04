import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { userDeailsContext } from '../../Contexts/UserContext'
import userImage from '../../images/userImage.png'
import { baseUrl, token } from '../../config/baseURL'

export default function ProfileBanner() {
    const {userDetails}=useContext(userDeailsContext)
  return (
    <View style={{flex:0.2,paddingTop:20,justifyContent:"center"}}>
        <View style={{alignItems:"center"}}>
        {userDetails.image?
          <Image source={{uri:baseUrl+userDetails.image+token}} style={styles.image} />:
          <Image source={userImage} style={styles.image} />
          }
        </View>
        <View style={{alignItems:"center"}}>
          <Text style={{color:"white",fontSize:19}}>{userDetails.username}</Text>
          <Text style={{color:"#3cdfff"}}>Entrease ID: {userDetails.id}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 55,
    height: 55,
    borderRadius: 50,
    borderWidth: 3,
  },
})
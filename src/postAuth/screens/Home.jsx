import {StyleSheet, Text, View} from 'react-native'
import React, {useContext, useEffect} from 'react'
import {Colors} from '../../config/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ScanContainer from '../components/ScanContainer'
import ProfileBanner from '../../preAuth/components/ProfileBanner'
import {
  updateResponseContext,
  userDeailsContext,
} from '../../Contexts/UserContext'
import {getDownloadURL, getStorage, ref} from '@react-native-firebase/storage'

const Home = () => {
  const {userDetails, setUserDetails} = useContext(userDeailsContext)
  const {updateResponse, setUpdateResponse} = useContext(updateResponseContext)

  const getCurrentUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user')

      var users = jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      console.error('Failed to fetch the user.', e)
    } finally {
      setUserDetails(users)
    }
  }
  console.log(userDetails)

  useEffect(() => {
    getCurrentUser()
  }, [updateResponse])


  
  return (
    <View style={styles.homeContainer}>
      <ProfileBanner />
      <ScanContainer />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
})

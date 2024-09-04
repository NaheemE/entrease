import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ScannedYourIdItem from './ScannedYourIdItem'
import { scannedResponseContext, userDeailsContext } from '../../Contexts/UserContext'
import firestore from '@react-native-firebase/firestore'
import ScannedByYouItem from './ScannedByYouItem'



export default function ScannedyourID() {
  const [scanedByYouDetails, setScannedByYouDetails] = useState({})
  const {userDetails, setUserDetails} = useContext(userDeailsContext)
  const {scannedResponse,setScannedResponse} = useContext(scannedResponseContext)


  

  const getDetails = async () => {
    try {
      const details = await firestore().collection('Details').get()
      setScannedByYouDetails(
        details._docs.filter(item => item._data.recieverId == userDetails.id),
      )
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getDetails()
  }, [scannedResponse])
  return (
    <View style={{marginHorizontal: 10, marginVertical: 20}}>
    <FlatList
      data={scanedByYouDetails}
      renderItem={({item}) => (
        <View>
          <View style={{height: 1, backgroundColor: '#D3D3D3'}}></View>
          <ScannedByYouItem item={item} />
        </View>
)}
ListEmptyComponent={() => (
  <View style={{ padding: 20, alignItems: 'center' }}>
    <Text style={{ fontSize: 16, color: 'gray' }}>Nothing to display</Text>
  </View>
)}
    />
  </View>

  )
}

const styles = StyleSheet.create({})
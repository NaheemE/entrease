import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import {
  scannedDetailsContext,
  scannedResponseContext,
  userDeailsContext,
} from '../../Contexts/UserContext'
import userImage from '../../images/userImage.png'
import UserData from '../components/UserData'
import {Colors} from '../../config/colors'
import { baseUrl, token } from '../../config/baseURL'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'


export default function AfterScanning() {
  const {scannedResponse,setScannedResponse}=useContext(scannedResponseContext)
  const {userDetails, setUserDetails} = useContext(userDeailsContext)
  const {scannedDetails, setScannedDetails} = useContext(scannedDetailsContext)

  const [selectedDetails, setSelectedDetails] = useState({})
  const navigation=useNavigation()

  const shareToDetails = JSON.parse(scannedDetails.data)
  

  const excludedKeys = ['username', 'id', 'image', 'password', 'confpassword','docId']

  const handleShare = async () => {
    const today = new Date();
    const date = today.toISOString().split('T')[0];
    const time = today.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const updatedDetails = {
      ...selectedDetails,
      senderId: userDetails.id,
      senderName: userDetails.username,
      senderImage: userDetails.image,
      recieverId: shareToDetails.id,
      recieverName: shareToDetails.username,
      recieverImage: shareToDetails.image,
      date: date,
      time: time,
    };
  
    setSelectedDetails(updatedDetails);
  
    
    try {
      await firestore()
        .collection('Details')
        .add(updatedDetails)
        .then(() => {
          Alert.alert('Details shared successfully');
          setScannedResponse(Date.now())
          navigation.navigate('HomeTabs');
        });
    } catch (e) {
      console.log('error' + e);
    }
  };
  

  return (
    <SafeAreaView>
      <ScrollView style={{minHeight: '100%'}}>
        <View style={{flex: 1}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginTop: 100,
            }}>
            Sharing to
          </Text>
          <View style={{alignItems: 'center', marginTop: 10}}>
          {shareToDetails.image ? (
            <Image
              source={{uri: baseUrl + shareToDetails.image + token}}
              style={styles.image}
            />
          ) : (
            <Image source={userImage} style={styles.image} />
          )}
          </View>
          <View>
            <Text style={styles.detailsTitle}>{shareToDetails.username}</Text>
            <Text style={{textAlign: 'center'}}>ID:{shareToDetails.id}</Text>
          </View>

          <View style={{marginHorizontal: 30, marginTop: 30}}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                marginBottom: 20,
              }}>
              Select fields to share
            </Text>

            <View>
              {Object.entries(userDetails)
                .filter(([key]) => !excludedKeys.includes(key))
                .map(
                  ([key, value], index) =>
                    value !== '' && (
                      <UserData
                        key={index}
                        label={key}
                        value={value}
                        selectedDetails={selectedDetails}
                        setSelectedDetails={setSelectedDetails}
                      />
                    ),
                )}
            </View>
            <TouchableOpacity
              onPress={handleShare}
              style={{
                backgroundColor: Colors.primary,
                height: 50,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  detailsTitle: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'gray',
  }
})

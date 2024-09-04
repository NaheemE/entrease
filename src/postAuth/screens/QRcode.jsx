import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useContext, useRef, useState} from 'react'
import ViewShot from 'react-native-view-shot'
import QRCode from 'react-native-qrcode-svg'
import RNFS from 'react-native-fs'
import {userDeailsContext} from '../../Contexts/UserContext'
import {Colors} from '../../config/colors'
import logo from '../../images/Entries.png'

export default function QRcode() {
  const {userDetails, setUserDetails} = useContext(userDeailsContext)
  const [qrcode, setQrcode] = useState({
    username:userDetails.username,
    id:userDetails.id,
    image:userDetails.image
  })
  const qrCodeRef = useRef(null)
  const viewShotRef = useRef(null)

  const getUniqueFilename = async (basePath, baseName, extension) => {
    let newPath = `${basePath}/${baseName}${extension}`
    let counter = 1

    while (await RNFS.exists(newPath)) {
      newPath = `${basePath}/${baseName}(${counter})${extension}`
      counter++
    }

    return newPath
  }

  const handleDownloadQrCode = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to save files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        )

        if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'Unable to access storage. Please enable the permission in settings.',
          )
          return
        }
      }

      const uri = await viewShotRef.current.capture()

      const basePath = RNFS.PicturesDirectoryPath
      const baseName = "entrease"
      const extension = '.png'

      const filePath = await getUniqueFilename(basePath, baseName, extension)

      await RNFS.moveFile(uri, filePath)
      await RNFS.scanFile(filePath)

      Alert.alert('Success', 'QR code has been downloaded successfully.')
    } catch (error) {
      console.error('Error downloading QR code:', error)
      Alert.alert('Error', 'Failed to download QR code. Please try again.')
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          fontSize: 25,
          fontWeight: '500',
          marginBottom: 30,
        }}>
        Scan this code
      </Text>
      <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1.0}}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            paddingVertical: 20,
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={logo}
              style={{width: 100, height: 40, marginBottom: 10}}
            />
          </View>
          <QRCode
            ref={qrCodeRef}
            value={JSON.stringify(qrcode)}
            size={250}
            color="black"
            backgroundColor="white"
          />
          <Text style={{color: 'black', fontSize: 17, marginTop: 10}}>
            {userDetails?.id}
          </Text>
        </View>
      </ViewShot>
      <View style={{paddingHorizontal: 30}}>
        <TouchableOpacity
          onPress={handleDownloadQrCode}
          style={{
            backgroundColor: Colors.primary,
            height: 50,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
            Download code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})

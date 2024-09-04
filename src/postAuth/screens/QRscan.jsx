import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import CustomMarker from '../components/CustomMarker';
import { scannedDetailsContext } from '../../Contexts/UserContext';
import { useNavigation } from '@react-navigation/native';

export default function QRscan() {
  const {scannedDetails,setScannedDetails}=useContext(scannedDetailsContext)
  const navigation=useNavigation()

  const handleRead=(data)=>{
    setScannedDetails(data)
    console.log(scannedDetails);
    navigation.navigate("AfterScan")
  }
  return (
    <QRCodeScanner
        onRead={(data)=>handleRead(data)
        }
        reactivate={true}
        reactivateTimeout={500}
        showMarker={true}
        cameraStyle={{height:"100%"}}
        customMarker={
          <CustomMarker/>
        }
        bottomContent={
          <View style={styles.buttonContainer}>
            <Button title="Bottom Button" />
          </View>
        }
      />
  )
}

const styles = StyleSheet.create({
  
})
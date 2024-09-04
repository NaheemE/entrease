import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, {useContext, useState} from 'react'
import CostomInput from '../../preAuth/components/CostomInput'
import {useForm} from 'react-hook-form'
import {Colors} from '../../config/colors'
import {
  updateResponseContext,
  userDeailsContext,
} from '../../Contexts/UserContext'
import userImage from '../../images/userImage.png'
import FAIcons from 'react-native-vector-icons/FontAwesome6'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
import {ActivityIndicator, MD2Colors} from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native'
import {baseUrl, token} from '../../config/baseURL'

export default function EditProfile() {
  const {userDetails, setUserDetails} = useContext(userDeailsContext)
  const {updateResponse, setUpdateResponse} = useContext(updateResponseContext)
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm()
  const [cameraPhoto, setCameraPhoto] = useState()
  const [galleryPhoto, setGalleryPhoto] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [transfered, setTransfered] = useState(0)
  const navigation = useNavigation()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    }

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('Image picker error: ', response.error)
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri
        setGalleryPhoto(imageUri)
      }
    })
  }

  const handleUpdatePressed = async data => {
    data.image = userDetails.image
    data.id = userDetails.id
    if (galleryPhoto !== null) {
      const uploadUri = galleryPhoto
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

      const extension = filename.split('.').pop()
      const name = filename.split('.').slice(0, -1).join('.')
      filename = name + Date.now() + '.' + extension

      const storageRef = storage().ref(filename)

      setUploading(true)
      try {
        await storageRef.putFile(uploadUri)
        setUploading(false)
        data.image = filename
      } catch (err) {
        console.log(err)
      }
      setGalleryPhoto(null)
    }

    try {
      await firestore()
        .collection('Users')
        .doc(userDetails.docId)
        .set(data, {merge: true})
      updateUserAsyncStorage(data)
      console.log('Successfull updated')
      navigation.navigate('Profile')
    } catch (error) {
      console.error(error)
    }
  }

  const updateUserAsyncStorage = async newUserData => {
    try {
      userDetails.username = newUserData.username || userDetails.username
      userDetails.email = newUserData.email || userDetails.email
      userDetails.image = newUserData.image || userDetails.image
      userDetails.address = newUserData.address || userDetails.address
      userDetails.bloodgrp = newUserData.bloodgrp || userDetails.bloodgrp
      userDetails.facebook = newUserData.facebook || userDetails.facebook
      userDetails.instagram = newUserData.instagram || userDetails.instagram
      userDetails.phone = newUserData.phone || userDetails.phone
      userDetails.place = newUserData.place || userDetails.place

      await AsyncStorage.setItem('@user', JSON.stringify(userDetails))
      setUpdateResponse(Date.now())
      console.log('Asyncstorage updated successfully')
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }
  return (
    <ScrollView style={styles.loginContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={{alignItems: 'center', marginTop: 30}}>
            {galleryPhoto !== null ? (
              <Image source={{uri: galleryPhoto}} style={styles.image} />
            ) : userDetails.image ? (
              <Image
                source={{uri: baseUrl + userDetails.image + token}}
                style={styles.image}
              />
            ) : (
              <Image source={userImage} style={styles.image} />
            )}
            <TouchableOpacity
              onPress={openImagePicker}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: 'blue', fontSize: 16}}>Edit</Text>
              <FAIcons name="pen" style={{marginLeft: 5, color: 'blue'}} />
            </TouchableOpacity>
          </View>
          <View style={{padding: 20}}>
            <CostomInput
              name="username"
              label="Username"
              control={control}
              initialValue={userDetails?.username}
              rules={{
                required: 'Username is required',
                minLength: {value: 3, message: 'Username must be 3 charectors'},
                maxLength: {
                  value: 20,
                  message: 'Username not longer than 20 charectors',
                },
              }}
            />
            <CostomInput
              name="email"
              label="Email"
              initialValue={userDetails?.email}
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {value: emailRegex, message: 'Invalid format'},
              }}
            />
            <CostomInput
              name="phone"
              label="Phone"
              initialValue={userDetails?.phone}
              control={control}
              rules={{
                required: 'Phone no is required',
                pattern: {value: phoneRegex, message: 'Invalid format'},
              }}
            />
            <CostomInput
              name="place"
              label="Place"
              initialValue={userDetails?.place}
              control={control}
            />
            <CostomInput
              name="address"
              label="Address"
              initialValue={userDetails?.address}
              control={control}
            />
            <CostomInput
              name="bloodgrp"
              label="Blood group"
              initialValue={userDetails?.bloodgrp}
              control={control}
            />
            <CostomInput
              name="instagram"
              label="Instagram"
              initialValue={userDetails?.instagram}
              control={control}
            />
            <CostomInput
              name="facebook"
              label="Facebook"
              initialValue={userDetails?.facebook}
              control={control}
            />
            <TouchableOpacity
              onPress={handleSubmit(handleUpdatePressed)}
              style={{
                backgroundColor: Colors.primary,
                height: 50,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              {uploading ? (
                <ActivityIndicator animating={true} color={MD2Colors.white} />
              ) : (
                <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
                  Update
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'gray',
  },
})

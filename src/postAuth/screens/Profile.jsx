import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useContext} from 'react'
import userImage from '../../images/userImage.png'
import {userDeailsContext} from '../../Contexts/UserContext'
import FAIcons from 'react-native-vector-icons/FontAwesome6'
import {Colors} from '../../config/colors'
import {CommonActions, useNavigation} from '@react-navigation/native'
import {baseUrl, token} from '../../config/baseURL'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = () => {
  const {userDetails, setUserDetails} = useContext(userDeailsContext)
  const navigation = useNavigation()

  const onEditPressed = () => {
    navigation.navigate('EditProfile')
  }
  const onLogoutPressed = async () => {
    try {
      await AsyncStorage.removeItem('@user');
      console.log('User data removed from AsyncStorage');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }], 
        })
      );

    } catch (error) {
      console.error('Failed to remove the user data:', error);
    }
  };
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View style={styles.banner}>
          {userDetails.image ? (
            <Image
              source={{uri: baseUrl + userDetails.image + token}}
              style={styles.image}
            />
          ) : (
            <Image source={userImage} style={styles.image} />
          )}
          <View style={{marginLeft: 10}}>
            <Text style={styles.bannerName}>{userDetails.username}</Text>
            <Text style={styles.bannerId}>ID: {userDetails.id}</Text>
          </View>
        </View>

        <View style={{marginHorizontal: 30}}>
          <View style={styles.profileItemContainer}>
            <View style={styles.iconContainer}>
              <FAIcons style={styles.icon} name="envelope" />
            </View>
            <View style={styles.profileTextContainer}>
              <Text>Email</Text>
              <Text style={styles.profileText}>{userDetails.email}</Text>
            </View>
          </View>

          <View style={styles.profileItemContainer}>
            <View style={styles.iconContainer}>
              <FAIcons style={styles.icon} name="phone" />
            </View>
            <View style={styles.profileTextContainer}>
              <Text>Phone</Text>
              <Text style={styles.profileText}>{userDetails.phone}</Text>
            </View>
          </View>

          <View style={styles.profileItemContainer}>
            <View style={styles.iconContainer}>
              <FAIcons style={styles.icon} name="location-dot" />
            </View>
            <View style={styles.profileTextContainer}>
              <Text>Location</Text>
              <Text style={styles.profileText}>
                {userDetails.place || 'Not updated'}
              </Text>
            </View>
          </View>

          <View style={styles.profileItemContainer}>
            <View style={styles.iconContainer}>
              <FAIcons style={styles.icon} name="address-book" />
            </View>
            <View style={styles.profileTextContainer}>
              <Text>Address</Text>
              <Text style={styles.profileText}>
                {userDetails.address || 'Not updated'}
              </Text>
            </View>
          </View>

          <View style={styles.profileItemContainer}>
            <View style={styles.iconContainer}>
              <FAIcons style={styles.icon} name="droplet" />
            </View>
            <View style={styles.profileTextContainer}>
              <Text>Blood group</Text>
              <Text style={styles.profileText}>
                {userDetails.bloodgrp || 'Not updated'}
              </Text>
            </View>
          </View>

          <View style={styles.profileItemContainer}>
            <View style={styles.iconContainer}>
              <FAIcons style={styles.icon} name="instagram" />
            </View>
            <View style={styles.profileTextContainer}>
              <Text>Instagram</Text>
              <Text style={styles.profileText}>
                {userDetails.instagram || 'Not updated'}
              </Text>
            </View>
          </View>

          <View style={styles.profileItemContainer}>
            <View style={styles.iconContainer}>
              <FAIcons style={styles.icon} name="facebook" />
            </View>
            <View style={styles.profileTextContainer}>
              <Text>Facebook</Text>
              <Text style={styles.profileText}>
                {userDetails.facebook || 'Not updated'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={onEditPressed}
            style={{
              backgroundColor: Colors.primary,
              height: 50,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onLogoutPressed}
            style={{
              backgroundColor: '#8F00FF',
              height: 50,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        
      </View>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 30,
  },
  bannerName: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  bannerId: {
    color: 'gray',
    fontSize: 15,
    fontWeight: '400',
  },
  profileItemContainer: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  icon: {
    color: Colors.primary,
    fontSize: 20,
  },
  iconContainer: {
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 12,
    elevation: 5,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: 'black',
    fontSize: 17,
    fontWeight: '500',
  },
  profileTextContainer: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  profileBottomText: {
    color: Colors.primary,
    fontSize: 17,
  },
  profileBottomContainer: {
    marginHorizontal: 32,
    marginVertical: 20,
    marginBottom: 50,
  },
})

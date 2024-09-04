import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import userImage from '../../images/userImage.png'
import {Colors} from '../../config/colors'
import FAIcons from 'react-native-vector-icons/FontAwesome6'

export default function ViewDetails() {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{alignItems: 'center', marginTop: 100}}>
        <Image source={userImage} style={{width: 100, height: 100}} />
      </View>
      <View>
        <Text style={styles.detailsTitle}>Jesse Pinkman</Text>
        <Text style={{textAlign: 'center'}}>ID: 9087542365</Text>
      </View>
      {/* <View style={{alignItems: 'center'}}>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsItem}>
            <Text style={styles.detailsText}>Email: </Text>
            <Text style={styles.detailsText}>Phone: </Text>
            <Text style={styles.detailsText}>Place: </Text>
            <Text style={styles.detailsText}>Instagram: </Text>
            <Text style={styles.detailsText}>Enter date: </Text>
            <Text style={styles.detailsText}>Enter time: </Text>
          </View>
          <View style={styles.detailsItem}>
            <Text style={styles.detailsText}>jesse@gmail.com</Text>
            <Text style={styles.detailsText}>9876786534</Text>
            <Text style={styles.detailsText}>Kochi</Text>
            <Text style={styles.detailsText}>www.instagram.com</Text>
            <Text style={styles.detailsText}>11/01/2024 </Text>
            <Text style={styles.detailsText}>9:00 PM </Text>
          </View>
        </View>
        
      </View> */}

      <View style={{marginHorizontal: 30, marginTop: 30}}>

        <View style={styles.profileItemContainer}>
          <View style={styles.iconContainer}>
            <FAIcons style={styles.icon} name="envelope" />
          </View>
          <View style={styles.profileTextContainer}>
            <Text>Email</Text>
            <Text style={styles.profileText}>jesse@gmail.com</Text>
          </View>
        </View>

        <View style={styles.profileItemContainer}>
          <View style={styles.iconContainer}>
            <FAIcons style={styles.icon} name="phone" />
          </View>
          <View style={styles.profileTextContainer}>
            <Text>Email</Text>
            <Text style={styles.profileText}>9447137801</Text>
          </View>
        </View>

        <View style={styles.profileItemContainer}>
          <View style={styles.iconContainer}>
            <FAIcons style={styles.icon} name="address-book" />
          </View>
          <View style={styles.profileTextContainer}>
            <Text>Email</Text>
            <Text style={styles.profileText}>Puliamamakl house Irikkur PO , Kannur</Text>
          </View>
        </View>

      </View>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.primary,
          height: 50,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
          marginHorizontal: 30,
        }}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  detailsTitle: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
  },
  // detailsItem: {
  //   color: 'black',
  //   marginVertical: 10,
  // },
  // detailsContainer: {
  //   marginHorizontal: 30,
  //   alignItems: 'center',
  //   marginTop: 30,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   width: 300,
  //   borderWidth:1,
  //       paddingHorizontal:30,
  //       paddingVertical:10,
  //       borderColor:"gray",
  //       borderRadius:20,
  //       marginTop:20
  // },
  // detailsText: {
  //   fontSize: 16,
  //   color: 'black',
  //   textAlign: 'left',
  //   width: 'auto',
  //   marginTop: 10,
  // },
  profileItemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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
})

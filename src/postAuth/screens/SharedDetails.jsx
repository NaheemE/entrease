import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useContext} from 'react'
import userImage from '../../images/userImage.png'
import {Colors} from '../../config/colors'
import FAIcons from 'react-native-vector-icons/FontAwesome6'
import UserData from '../components/UserData'
import {userDeailsContext} from '../../Contexts/UserContext'

export default function SharedDetails({route}) {
  const {userDetails, setUserDetails} = useContext(userDeailsContext)
  const {item} = route.params
  const excludedKeys = [
    'recieverName',
    'recieverId',
    'recieverImage',
    'senderName',
    'senderId',
    'senderImage',
  ]

  return (
    <SafeAreaView>
      <ScrollView>
        {userDetails.id == item._data.senderId && (
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginTop: 30,
            }}>
            Shared to
          </Text>
        )}
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Image source={userImage} style={{width: 100, height: 100}} />
        </View>
        <View>
          <Text style={styles.detailsTitle}>{!userDetails.id == item._data.recieverId?item._data.recieverName:item._data.senderName}</Text>
          <Text style={{textAlign: 'center'}}>ID: {!userDetails.id == item._data.recieverId?item._data.recieverId:item._data.senderId}</Text>
        </View>

        <View style={{marginHorizontal: 30, marginTop: 30}}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginBottom: 20,
            }}>
            Shared details
          </Text>

          <View>
            {Object.entries(item._data)
              .filter(([key]) => !excludedKeys.includes(key))
              .map(
                ([key, value], index) =>
                  value !== '' && (
                    <UserData
                      key={index}
                      label={key}
                      value={value}
                      historyScreen={true}
                    />
                  ),
              )}
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

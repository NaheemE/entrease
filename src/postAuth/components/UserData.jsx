import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Checkbox} from 'react-native-paper'
import {Colors} from '../../config/colors'
import FAIcons from 'react-native-vector-icons/FontAwesome6'

export default function UserData({
  key,
  label,
  value,
  selectedDetails,
  setSelectedDetails,
  historyScreen,
}) {
  const [checked, setChecked] = React.useState(false)
  const [icon, setIcon] = useState('')

  const handleClick = () => {
    if (!historyScreen) {
      setChecked(prevChecked => {
        const newChecked = !prevChecked
        if (newChecked) {
          setSelectedDetails(prevDetails => ({
            ...prevDetails,
            [label]: value,
          }))
        } else {
          setSelectedDetails(prevDetails => {
            const newDetails = {...prevDetails}
            delete newDetails[label]
            return newDetails
          })
        }
        return newChecked
      })
    }
  }
  console.log(selectedDetails)

  useEffect(() => {
    if (label == 'email') {
      setIcon('envelope')
    } else if (label == 'phone') {
      setIcon('phone')
    } else if (label == 'place') {
      setIcon('location-dot')
    } else if (label == 'address') {
      setIcon('address-book')
    } else if (label == 'bloodgrp') {
      setIcon('droplet')
    } else if (label == 'instagram') {
      setIcon('instagram')
    } else if (label == 'facebook') {
      setIcon('facebook')
    }else if (label == 'date') {
      setIcon('calendar-days')
    }else if (label == 'time') {
      setIcon('clock')
    }
  }, [])

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={styles.profileItemContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.iconContainer}>
            <FAIcons style={styles.icon} name={icon} />
          </View>
          <View style={styles.profileTextContainer}>
            <Text>{label}</Text>
            <Text style={styles.profileText}>{value}</Text>
          </View>
        </View>
        <View>
          {!historyScreen && (
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              color="green"
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  profileItemContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'space-between',
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
})

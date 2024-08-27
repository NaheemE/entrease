import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';


export default function CostomInput({label,value,onChangeText,secureTextEntry}) {
    const [text, setText] = React.useState("");

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode='outlined'
      theme={{ colors: { primary: 'black', outline: 'grey' } }} 
      style={{marginBottom:10,backgroundColor:"white"}}
      secureTextEntry={secureTextEntry}
    />
  )
}

const styles = StyleSheet.create({})
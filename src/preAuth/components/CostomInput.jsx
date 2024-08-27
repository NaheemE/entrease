import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';


export default function CostomInput({label,secureTextEntry,control,name,rules}) {

  return (
    <View>
      
      <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field:{value,onChange,onBlur},fieldState:{error}})=>(
        <View style={{marginBottom:10}}>
          <TextInput
          label={label}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          mode='outlined'
          theme={{ colors: { primary:error?"red": 'black', outline:error?"red": 'grey' } }} 
          style={{backgroundColor:"white"}}
          secureTextEntry={secureTextEntry}
        />
        {error&& <Text style={{color:"red"}}>{error.message}</Text>}
        </View>
      )}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

export default function CostomizedButton({backgroundColor,color,fontSize,title}) {
  return (
    <TouchableOpacity style={{height:50,backgroundColor:{backgroundColor}}}>
        <Text style={{color:{color},fontSize:{fontSize}}}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})
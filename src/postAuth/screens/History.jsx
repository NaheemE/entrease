import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../config/colors'
import ScannedByYou from '../components/ScannedByYou'
import ScannedyourID from '../components/ScannedyourID'

const History = () => {
  const [currentScreen,setCurrentScreen]=useState(1)
  return (
        <View style={{flex:1,marginTop:30}}>
          <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
            <View>
              <TouchableOpacity onPress={()=>setCurrentScreen(1)}>
                <Text style={{color:currentScreen==1?Colors.primary:"black",fontSize:17,fontWeight:"500"}}>Scanned by you</Text>
              </TouchableOpacity>
              {currentScreen==1&&<View style={{height:1,width:"auto",backgroundColor:"blue",borderRadius:5,marginTop:5}}>
              </View>}
            </View>
            <View>
              <TouchableOpacity onPress={()=>setCurrentScreen(2)}>
              <Text style={{color:currentScreen==2?Colors.primary:"black",fontSize:17,fontWeight:"500"}}>Scanned your ID</Text>
              </TouchableOpacity>
              {currentScreen==2&&<View style={{height:1,width:"auto",backgroundColor:"blue",borderRadius:5,marginTop:5}}>
              </View>}
            </View>
          </View>
            <View>
              {
                currentScreen==1?<ScannedByYou/>:<ScannedyourID/>
              }
            </View>
        </View>
  )
}

export default History

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'

export const userDeailsContext=createContext()
export const scannedDetailsContext=createContext()
export const updateResponseContext=createContext()
export const registerResponseContext=createContext()
export const scannedResponseContext=createContext()


export default function userDetails({children}) {
    const [userDetails,setUserDetails]=useState({})
    const [scannedDetails,setScannedDetails]=useState({})
    const [updateResponse,setUpdateResponse]=useState()
    const [registerResponse,setRegisterResponse]=useState()
    const [scannedResponse,setScannedResponse]=useState()
  return (
    <scannedResponseContext.Provider value={{scannedResponse,setScannedResponse}}>
      <registerResponseContext.Provider value={{registerResponse,setRegisterResponse}}>
        <updateResponseContext.Provider value={{updateResponse,setUpdateResponse}}>
          <scannedDetailsContext.Provider value={{scannedDetails,setScannedDetails}}>
            <userDeailsContext.Provider value={{userDetails,setUserDetails}}>
                {children}
            </userDeailsContext.Provider>
          </scannedDetailsContext.Provider>
        </updateResponseContext.Provider>
      </registerResponseContext.Provider>
    </scannedResponseContext.Provider>
  )
}

const styles = StyleSheet.create({})
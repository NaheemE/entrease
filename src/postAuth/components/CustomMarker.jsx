import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CustomMarker() {
    
  return (
    <View style={styles.customMarkerContainer}>
          <View style={styles.topOverlay} />
          <View style={styles.centerOverlay}>
            <View style={styles.sideOverlay} />
            <View style={styles.markerContainer}>
              <View style={styles.markerTopLeft} />
              <View style={styles.markerTopRight} />
              <View style={styles.markerBottomLeft} />
              <View style={styles.markerBottomRight} />
            </View>
            <View style={styles.sideOverlay} />
          </View>
          <View style={styles.bottomOverlay}>
            <Text style={styles.instructionsText}>Align the QR code within the frame to scan</Text>
          </View>
        </View>
  )
}

const styles = StyleSheet.create({
    customMarkerContainer: {
        flex: 1,
        alignItems: 'center',
      },
      topOverlay: {
        flex: 1,
        width: '100%',
      },
      centerOverlay: {
        flexDirection: 'row',
      },
      sideOverlay: {
        flex: 1,
      },
      markerContainer: {
        width: 200,
        height: 200,
      },
      markerTopLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: '#00FF00',
      },
      markerTopRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 20,
        height: 20,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderColor: '#00FF00',
      },
      markerBottomLeft: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 20,
        height: 20,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderColor: '#00FF00',
      },
      markerBottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 20,
        height: 20,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: '#00FF00',
      },
      bottomOverlay: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      instructionsText: {
        color: '#FFF',
        fontSize: 18,
      },
})
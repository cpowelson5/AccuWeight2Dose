import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function GuideScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Back Button with Larger Icon */}
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/back.png')} style={styles.goBackIcon} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>EMS Pediatric Quick Reference Guide</Text>

      {/* Guide Image */}
      <Image
        source={require('../assets/guide.png')}
        style={styles.guideImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  goBackButton: {
    position: 'absolute',
    top: 50, // Adjusted for better spacing
    left: 20,
    zIndex: 10,
  },
  goBackIcon: {
    width: 32, // Increased size
    height: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 100, // Adjust spacing below the back button
    marginBottom: 20,
    textAlign: 'center',
  },
  guideImage: {
    width: '95%', // Slightly increased width
    height: '75%', // Increased height
    marginTop: -10, // Adjusted position upward
  },
});

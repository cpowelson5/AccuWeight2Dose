import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { finalWeight } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estimated Weight</Text>
      <Text style={styles.result}>{finalWeight.toFixed(1)} kg</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  result: { fontSize: 32, fontWeight: 'bold', marginBottom: 30, color: '#007BFF' },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16 },
});

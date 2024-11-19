import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export default function ResultScreen({ route, navigation }) {
  const { finalWeight, matchedColor } = route.params;
  const [weightUnit, setWeightUnit] = useState('kg');

  const convertWeight = (weight, unit) => {
    return unit === 'kg' ? weight : weight * 2.20462;
  };

  const displayedWeight = convertWeight(finalWeight, weightUnit).toFixed(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estimated Weight</Text>
      <Text style={[styles.result, { color: matchedColor }]}>
        {displayedWeight} {weightUnit}
      </Text>

      <SegmentedControl
        values={['kg', 'lb']}
        selectedIndex={weightUnit === 'kg' ? 0 : 1}
        onChange={(event) =>
          setWeightUnit(event.nativeEvent.selectedSegmentIndex === 0 ? 'kg' : 'lb')
        }
        style={styles.segmentedControl}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  result: { fontSize: 32, fontWeight: 'bold', marginBottom: 30 },
  segmentedControl: { width: 200, marginBottom: 30 },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16 },
});

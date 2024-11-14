import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export default function CombinedScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0); // 切换 Camera 和 Manual Input
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg'); // Weight 单位
  const [heightUnit, setHeightUnit] = useState('cm'); // Height 单位

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to AccuWeight2Dose</Text>

      {/* Segmented Control */}
      <SegmentedControl
        values={['Camera', 'Manual Input']}
        selectedIndex={selectedIndex}
        onChange={(event) => setSelectedIndex(event.nativeEvent.selectedSegmentIndex)}
        style={styles.segmentedControl}
      />

      {/* Camera 页面 */}
      {selectedIndex === 0 && (
        <View style={styles.cameraContainer}>
          <Text style={styles.infoText}>Measure height with Camera</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Manual Input 页面 */}
      {selectedIndex === 1 && (
        <View style={styles.manualInputContainer}>
          <Text style={styles.label}>Weight <Text style={styles.recommended}>(recommended)</Text>:</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Enter weight"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
            <SegmentedControl
              values={['kg', 'lb']}
              selectedIndex={weightUnit === 'kg' ? 0 : 1}
              onChange={(event) => setWeightUnit(event.nativeEvent.selectedSegmentIndex === 0 ? 'kg' : 'lb')}
              style={styles.unitSelector}
            />
          </View>

          <Text style={styles.label}>Height:</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Enter height"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
            <SegmentedControl
              values={['cm', 'in']}
              selectedIndex={heightUnit === 'cm' ? 0 : 1}
              onChange={(event) => setHeightUnit(event.nativeEvent.selectedSegmentIndex === 0 ? 'cm' : 'in')}
              style={styles.unitSelector}
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  segmentedControl: { marginBottom: 20 },
  cameraContainer: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  infoText: { fontSize: 18, marginBottom: 20 },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
  manualInputContainer: { flex: 1 },
  label: { fontSize: 18, marginBottom: 10 },
  recommended: { fontSize: 14, color: '#888' }, // 样式细化
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
  unitSelector: { marginLeft: 10, flex: 0.6 }, // 控制单位切换组件的大小
});

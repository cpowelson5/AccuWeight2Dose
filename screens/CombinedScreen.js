import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

// JSON Data
const heightWeightData = [
  {"height_min": 41.4, "height_max": 47.2, "weight": 3, "color": "grey"},
  {"height_min": 47.2, "height_max": 53.3, "weight": 4, "color": "grey"},
  {"height_min": 53.3, "height_max": 58.8, "weight": 5, "color": "grey"},
  {"height_min": 58.8, "height_max": 63.7, "weight": 6, "color": "pink"},
  {"height_min": 63.7, "height_max": 68.3, "weight": 7, "color": "pink"},
  {"height_min": 68.3, "height_max": 72.6, "weight": 8, "color": "red"},
  {"height_min": 72.6, "height_max": 76.6, "weight": 9, "color": "red"},
  {"height_min": 76.6, "height_max": 80.4, "weight": 10, "color": "purple"},
  {"height_min": 80.4, "height_max": 84.1, "weight": 11, "color": "purple"},
  {"height_min": 84.1, "height_max": 87.5, "weight": 12, "color": "yellow"},
  {"height_min": 87.5, "height_max": 90.9, "weight": 13, "color": "yellow"},
  {"height_min": 90.9, "height_max": 94.0, "weight": 14, "color": "yellow"},
  {"height_min": 94.0, "height_max": 97.1, "weight": 15, "color": "white"},
  {"height_min": 97.1, "height_max": 100.1, "weight": 16, "color": "white"},
  {"height_min": 100.1, "height_max": 103.0, "weight": 17, "color": "white"},
  {"height_min": 103.0, "height_max": 105.8, "weight": 18, "color": "white"},
  {"height_min": 105.8, "height_max": 108.6, "weight": 19, "color": "blue"},
  {"height_min": 108.6, "height_max": 111.2, "weight": 20, "color": "blue"},
  {"height_min": 111.2, "height_max": 113.8, "weight": 21, "color": "blue"},
  {"height_min": 113.8, "height_max": 116.4, "weight": 22, "color": "blue"},
  {"height_min": 116.4, "height_max": 118.9, "weight": 23, "color": "blue"},
  {"height_min": 118.9, "height_max": 121.2, "weight": 24, "color": "orange"},
  {"height_min": 121.2, "height_max": 123.6, "weight": 25, "color": "orange"},
  {"height_min": 123.6, "height_max": 126.0, "weight": 26, "color": "orange"},
  {"height_min": 126.0, "height_max": 128.3, "weight": 27, "color": "orange"},
  {"height_min": 128.3, "height_max": 130.5, "weight": 28, "color": "orange"},
  {"height_min": 130.5, "height_max": 132.7, "weight": 29, "color": "orange"},
  {"height_min": 132.7, "height_max": 134.8, "weight": 30, "color": "green"},
  {"height_min": 134.8, "height_max": 137.0, "weight": 31, "color": "green"},
  {"height_min": 137.0, "height_max": 139.0, "weight": 32, "color": "green"},
  {"height_min": 139.0, "height_max": 141.1, "weight": 33, "color": "green"},
  {"height_min": 141.1, "height_max": 143.2, "weight": 34, "color": "green"},
  {"height_min": 143.2, "height_max": 145.1, "weight": 35, "color": "green"},
  {"height_min": 145.1, "height_max": 147.2, "weight": 36, "color": "green"},
  {"height_min": 147.2, "height_max": 149.1, "weight": 37, "color": "green"}
];

// dosage数据
const dosageData = [
  {"name":"Epinephrine 1 mg/10 mL (IV)", "dosagePerKg": 0.01, "concentration (mg/mL)": 0.1},
  {"name":"Fentanyl (IV, IO)", "dosagePerKg": 0.001, "concentration (mg/mL)": 0.05},
  {"name":"Midazolam (IN)", "dosagePerKg": 0.2, "concentration (mg/mL)": 5},
];

export default function CombinedScreen({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');


  // 单位转换函数
  const convertWeightToKg = (value, unit) => (unit === 'lb' ? value * 0.453592 : value);
  const convertHeightToCm = (value, unit) => (unit === 'in' ? value * 2.54 : value);

  // 根据 Height 从 JSON 表格估算 Weight
  const estimateWeightFromHeight = (heightCm) => {
    const entry = heightWeightData.find(
      (item) => heightCm > item.height_min && heightCm <= item.height_max
    );
    return entry ? entry.weight : null;
  };

  // 根据 Weight 从 JSON 表格计算剂量
  const calculateDosageForWeight = (weightKg) => {
    return dosageData.map(medication => {
      const concentration = medication['concentration (mg/mL)'];
      const dosage = (medication.dosagePerKg * weightKg) / concentration;
      return {
        medication: medication.name,
        dosagePerKg: medication.dosagePerKg,
        concentration: concentration,
        weight: weightKg,
        calculatedVolume: dosage.toFixed(2) + ' ml',
      };
    });
  };
  
  // 测试测试测试测试
  //   const weight = 36; // patient's weight in kg
  // const dosages = calculateDosageForWeight(weight);

  // // Display results
  // dosages.forEach(dosageInfo => {
  //   console.log(`Medication: ${dosageInfo.medication}`);
  //   console.log(`  Dosage per kg: ${dosageInfo.dosagePerKg} mg/kg`);
  //   console.log(`  Concentration: ${dosageInfo.concentration} mg/mL`);
  //   console.log(`  Patient weight: ${dosageInfo.weight} kg`);
  //   console.log(`  Calculated volume: ${dosageInfo.calculatedVolume}`);
  //   console.log('----------------------------');
  // });


  // 处理 Finish 按钮点击事件
  const handleFinish = () => {
    if (!weight && !height) {
      Alert.alert('Error', 'Please input either weight or height.');
      return;
    }

    let finalWeight = null;

    if (weight) {
      finalWeight = parseFloat(weight) * (weightUnit === 'lb' ? 0.453592 : 1);
    } else if (height) {
      const convertedHeight = parseFloat(height) * (heightUnit === 'in' ? 2.54 : 1);
      const matchedEntry = heightWeightData.find(
        (entry) => convertedHeight >= entry.height_min && convertedHeight < entry.height_max
      );

      if (matchedEntry) {
        finalWeight = matchedEntry.weight;
      } else {
        Alert.alert('Error', 'Unable to estimate weight from the given height.');
        return;
      }
    }

    navigation.navigate('Result', { finalWeight });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tutorialLogo}
        onPress={() => navigation.navigate('Guide')}
      >
        <Image source={require('../assets/tutorial.png')} style={styles.logo} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to AccuWeight2Dose</Text>

        <SegmentedControl
          values={['Camera', 'Manual Input']}
          selectedIndex={selectedIndex}
          onChange={(event) => setSelectedIndex(event.nativeEvent.selectedSegmentIndex)}
          style={styles.segmentedControl}
        />

        {selectedIndex === 0 && (
          <View style={styles.cameraContainer}>
            <Text style={styles.infoText}>Use Camera to Measure Height</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Open Camera</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedIndex === 1 && (
          <View style={styles.manualInputContainer}>
            <Text style={styles.label}>Weight (recommended):</Text>
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
                onChange={(event) =>
                  setWeightUnit(event.nativeEvent.selectedSegmentIndex === 0 ? 'kg' : 'lb')
                }
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
                onChange={(event) =>
                  setHeightUnit(event.nativeEvent.selectedSegmentIndex === 0 ? 'cm' : 'in')
                }
                style={styles.unitSelector}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleFinish}>
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  tutorialLogo: { position: 'absolute', top: 50, left: 20 },
  logo: { width: 40, height: 40 },
  content: { flex: 1, marginTop: 120, paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  segmentedControl: { marginBottom: 20 },
  cameraContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  infoText: { fontSize: 18, marginBottom: 20 },
  manualInputContainer: { flex: 1 },
  label: { fontSize: 18, marginBottom: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5 },
  unitSelector: { marginLeft: 10, flex: 0.5 },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
});

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CombinedScreen from './screens/CombinedScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Combined">
        <Stack.Screen name="Combined" component={CombinedScreen} options={{ title: 'AccuWeight2Dose' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

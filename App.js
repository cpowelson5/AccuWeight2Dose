import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CombinedScreen from './screens/CombinedScreen';
import ResultScreen from './screens/ResultScreen';
import GuideScreen from './screens/GuideScreen'; // 导入 GuideScreen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Combined">
        <Stack.Screen
          name="Combined"
          component={CombinedScreen}
          options={{ headerShown: false }} // 移除顶部标题
        />
        <Stack.Screen
          name="Guide"
          component={GuideScreen}
          options={{ headerShown: false }} // 移除顶部标题
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ headerShown: false }} // 移除顶部标题
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

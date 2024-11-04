import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './index';
import Game from './game';
import Start from './start';
import { Platform } from 'react-native';

export type RootStackParamList = {
  Index: undefined;  
  Start:{
    playerName: string;
    language: string;
    avatarIndex: number;
  }
  Game: {
    roomName: string; 
    player: string;   
    players: { name: string; lang: string; avatarIndex: number }[];
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const title = () => Platform.select({ web: `Quizapp`});
  
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="Index" 
          component={Index} 
          options={{
            headerShown: false ,
            title: title() }} 
        />
        <Stack.Screen 
          name="Start" 
          component={Start} 
          options={{
            headerShown: false ,
            title: title() }} 
        />
        <Stack.Screen 
          name="Game" 
          component={Game} 
          options={{
            headerShown: false ,
            title: title() }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

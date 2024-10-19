import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './index';
import Game from './game';
import Start from './start';

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
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen 
          name="Index" 
          component={Index} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Start" 
          component={Start} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Game" 
          component={Game} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

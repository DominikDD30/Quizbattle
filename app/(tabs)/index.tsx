import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link, Stack, useRouter } from 'expo-router'
import Orientation from 'react-native-orientation-locker';

const { width, height } = Dimensions.get('window');

const index = () => {
  const [roomCode, setRoomCode] = useState('');
  const [roomUrl, setRoomUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    Orientation.lockToLandscape(); // Wymusza orientację horyzontalną po wejściu na ekran

    return () => {
      Orientation.unlockAllOrientations(); // Odblokowuje orientację po wyjściu z ekranu
    };
  }, []);

  const showUrlText = () => {
    setRoomUrl("Room created: example.com/room123");
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/logo3.jpg')}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        resizeMode="cover"
      >
        <StatusBar style="auto" />

        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.button} onPress={showUrlText}>
            <Text style={styles.buttonText}>Create New Room</Text>
          </TouchableOpacity>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Enter room code"
              placeholderTextColor="gray"
              value={roomCode}
              onChangeText={setRoomCode}
            />
            <TouchableOpacity style={styles.button} onPress={() => router.push(`/profile?code=${roomCode}`)}>
              <Text style={styles.buttonText}>Join Room</Text>
            </TouchableOpacity>
          </View>

          {roomUrl && <Text style={styles.roomUrl}>{roomUrl}</Text>}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Półprzezroczyste tło
    padding: 20,
    borderRadius: 10,
    width: width * 0.85, // Ustawienie szerokości względem ekranu
    maxWidth: 400,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%', // Przycisk zajmuje całą szerokość formularza
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
    color: 'white',
    height: 40,
    borderRadius: 5,
  },
  roomUrl: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});
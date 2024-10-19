import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Platform,
  StyleSheet,
  Alert,
  Clipboard,
  Animated,
  Dimensions
} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import socket from '../socket';
import DifficultySelector from './DifficultySelector';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from './_layout';

export interface Player {
  socketId: string;
  name: string;
  lang: string;
  avatarIndex: number;
  score: number;
}

const { width } = Dimensions.get('window'); 




type StartScreenProps = NativeStackScreenProps<RootStackParamList, 'Start'>;

const Start: React.FC<StartScreenProps> = ({ navigation, route }) => {
  const playerName = route.params?.playerName;
  const avatarIndex = route.params?.avatarIndex;
  const lang = route.params?.language;
  const [language, setLanguage] = useState(lang||'EN');
  const [playerJoinedAlert, setPlayerJoinedAlert] = useState('');
  const opacity = useRef(new Animated.Value(0)).current;
  const [activeUsers, setActiveUsers] = useState(0);
  const [joinRoomText, setJoinRoomText] = useState('');
  const [roomName, setRoomName] = useState('');
  const [currentRoomId, setCurrentRoomId] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [isOwner, setIsOwner] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  const updateDimensions = () => {
    setWindowWidth(Dimensions.get('window').width);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', updateDimensions);
    
    return () => {
    };
  }, []);

  

  useEffect(() => {
    if (Platform.OS !== 'web') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('update_active_users', (count, player,isNewPlayer) => {
      setActiveUsers(count);
      console.log('active users ',count);
      const joinText=language === 'EN' ? ' has joined the room' : ' dołączył do pokoju';
      const leaveText=language === 'EN' ? ' has left the room' : ' odszedł z pokoju';
      setPlayerJoinedAlert(player + (isNewPlayer?joinText:leaveText));
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }).start(() => {
          setPlayerJoinedAlert('');
        });
      }, 2000);
    });

    socket.on('game_started', (data: { players: { name: string,lang:string,avatarIndex: number }[], roomName: string }) => {
      const players = data.players;
      if (!playerName) {
        console.log('Player name is not set yet.');
        return;
      }
      console.log('Game started with players:', players + ' in room: ' + currentRoomId + ' you are: ' + playerName);
      navigation.navigate('Game', { player: playerName, players: players, roomName: data.roomName });
    });

    socket.on('room_created', (room) => {
      console.log('New room created:', room);
    });

    socket.on('room_deleted', (roomId) => {
      console.log(`Room ${roomId} has been deleted.`);
    });

    return () => {
      socket.off('connect');
      socket.off('update_active_users');
      socket.off('room_created');
      socket.off('room_deleted');
    };
  }, []);


  const joinRoom = () => {
    if (joinRoomText) {
      socket.emit('join_room', joinRoomText, playerName,language, avatarIndex, (success:boolean, room:any) => {
        if (success && room) {
          setRoomName(room.name);
          setCurrentRoomId(room.name);
          setActiveUsers(room.activeUsers);
          Alert.alert(language === 'EN' ? 'Success' : 'Sukces', `${language === 'EN' ? 'You joined room' : 'Dołączyłeś do pokoju'}: ${room.name}`);
        } else {
          Alert.alert(language === 'EN' ? 'Error' : 'Błąd', language === 'EN' ? 'Room not found.' : 'Nie znaleziono pokoju o podanym ID.');
        }
      });
      setJoinRoomText('');
      setIsGuest(true);
    }
  };

  const leaveRoom = () => {
    socket.emit('leave_room', currentRoomId, playerName);
    setJoinRoomText('');
    setRoomName('');
    setCurrentRoomId('');
    setActiveUsers(0);
    setIsOwner(false);
    setIsGuest(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'PL' : 'EN');
    socket.emit('change_language', language === 'EN' ? 'PL' : 'EN',roomName, playerName);
  };

  const createRoom = () => {
    const generatedRoomName = Math.random().toString(36).substring(2, 8);
    Clipboard.setString(generatedRoomName);
    alert((language === 'EN' ? 'Room name copied to clipboard' : 'Nazwa pokoju skopiowana do schowka') + ': ' + generatedRoomName);
    socket.emit('create_room', generatedRoomName,difficulty, playerName,language,avatarIndex, (newRoom:any) => {
      setRoomName(newRoom.name);
      setCurrentRoomId(newRoom.name);
      setActiveUsers(newRoom.activeUsers);
      Alert.alert(language === 'EN' ? 'Success' : 'Sukces', `${language === 'EN' ? 'Created room' : 'Utworzono pokój'}: ${newRoom.name}`);
    });
    setIsOwner(true);
  };

  const startGame = () => {
    console.log('Starting game room: ' + currentRoomId);
    socket.emit('start_game', currentRoomId);
  }

  if (windowWidth < 500) {
    return (
      <View>
        <Text>{language=='EN'?'Please turn your device to landscape view':'Obróć telefon horyzontalnie'}</Text>
      </View>
    );
  }
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/images/logo7.jpg')}
        style={{ flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}
        resizeMode="cover"
      >
        <Animated.Text id='newPlayer' style={[styles.newPlayer, { opacity }]}>{playerJoinedAlert}</Animated.Text>

        <View style={styles.langBox}>
          <Text style={{ fontSize: 22, color: 'white' }}>
            {language === 'EN' ? 'Game Lang ' : 'Język Gry '}
          </Text>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'gray',
            }}
            onPress={toggleLanguage}
          >
            <ImageBackground
              source={language === 'EN'
                ? require('../assets/images/eng.jpg')
                : require('../assets/images/pl.webp')}
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ ...styles.formContainer, bottom: Platform.OS == 'web' ? 100 : 50 }}>
          
            {activeUsers>0&&<Text style={styles.buttonText}>
              {language === 'EN' ? 'Players in room: ' : 'Aktywni gracze w pokoju: '}{activeUsers}
            </Text>}
          <View style={styles.inputRow}>
            {!isGuest&&
            <TouchableOpacity style={[styles.button,{marginRight:'auto'}]} onPress={(activeUsers > 1&&isOwner) ? startGame : createRoom}>
              <Text style={styles.buttonText}>
                {activeUsers > 1 ? (language === 'EN' ? 'Start Game' : 'Rozpocznij grę') : (language === 'EN' ? 'Create New Room' : 'Utwórz nowy pokój')}
              </Text>
            </TouchableOpacity>}

              
            {activeUsers==0&&<DifficultySelector lang={language} roomName={roomName} onDifficultyChange={setDifficulty} />}

            {activeUsers!=0&&<TouchableOpacity style={[styles.button,{backgroundColor:'gray'}]} onPress={leaveRoom}>
              <Text style={styles.buttonText}>
                {language === 'EN' ? 'Leave Room' : 'Opuść pokój'}
              </Text>
            </TouchableOpacity>
            }
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder={language === 'EN' ? 'Enter room ID' : 'Wprowadź ID pokoju'}
              placeholderTextColor="gray"
              value={joinRoomText}
              onChangeText={setJoinRoomText} />
            <TouchableOpacity style={styles.button} onPress={joinRoom}>
              <Text style={styles.buttonText}>
                {language === 'EN' ? 'Join Room' : 'Dołącz do pokoju'}
              </Text>
            </TouchableOpacity>
          </View>

          {roomName && <Text style={styles.roomUrl}>{language === 'EN' ? 'Joined room: ' : 'Dołączyłeś do pokoju: '}{roomName}</Text>}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    position: 'absolute',
    bottom: 50,
    right: '10%',
    flex: 1,
    paddingTop: 25,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: 170,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    marginVertical: 5,
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  langBox: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    top: (Platform.OS == 'web') ? 50 : 30 ,
    right: '8%',
    padding: 10,
    zIndex: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: 170,
    marginRight: 20,
    backgroundColor: '#fff',
  },
  roomUrl: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  newPlayer: {
    position: 'absolute',
    top: '10%',
    left: '50%',
    color: 'red',
    transform: Platform.OS == 'web'?'traslateX(-50%)':[{ translateX: -(width * 0.5) }],
    textAlign: 'center',
    fontSize: 32,
  },
});

export default Start;

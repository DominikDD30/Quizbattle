import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ImageBackground } from 'react-native';
import QuestionComponent from './QuestionComponent';
import socket from '../socket';
import PlayersScoresPopup from './PlayersScoresPopup';
import avatars from './Avatars';
import { Player } from './start';
import OfflineAvatar from './OfflineAvatar';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from './_layout';





type GameScreenProps = NativeStackScreenProps<RootStackParamList, 'Game'>;



const Game: React.FC<GameScreenProps> = ({ navigation, route }) => {
  const roomName = route.params?.roomName;
  const playerName = route.params?.player;
  const [players, setPlayers] = useState<Player[]>([]);
  const [initPlayersAmount, setInitPlayersAmount] = useState(0); 
  const [showScores, setShowScores] = useState(false); 
 
  useEffect(() => {
    const newPlayers: Player[] = route.params?.players.map((_player:{name:string,lang:string,avatarIndex:number}) => {
      return {name:_player.name,socketId:'',lang:_player.lang,avatarIndex:_player.avatarIndex, score:0};
    });
    setInitPlayersAmount(newPlayers.length);
    console.log("newPlayers "+newPlayers.map(player => player.name+' '+player.lang));
      setPlayers(newPlayers);
  }, []);

  socket.on('update_points', ({players}) => {
    setPlayers(players);
  });

  socket.on('user_disconnect', (playerName) => {
    setPlayers(players.map(player => 
      player.name === playerName 
        ? { ...player, socketId: '' }  
        : player 
    ));
  });

  const handleBackToMenu = () => {
    socket.emit('reset_points', roomName);
    const player=players.filter(player => player.name === playerName)[0];
    navigation.navigate('Start',{playerName:playerName,avatarIndex:player.avatarIndex,language:player.lang});
  };

  if(players.length === 0){
    return (
      <SafeAreaView style={styles.container}>
        <View >
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/game_bg1.jpg')}
        style={styles.background}
        resizeMode="cover"
      >

      
      <View style={[styles.circleTopLeft, styles.circle]}>
      {players[0] ?
      <>
        <Text style={styles.text}>{players[0].name}
          <Text style={styles.points}> {players[0].score}</Text>
        </Text>
        <View style={styles.avatarBackground}>
        {avatars[players[0].avatarIndex].value}
        </View>
      </>
        :<OfflineAvatar/>
          }
      </View>
    

      
      <View style={[styles.circleTopRight, styles.circle]}>
      {players[1] ?
      <>
        <Text style={styles.text}>
          <Text style={styles.points}> {players[1].score} </Text>
        {players[1].name}  
        </Text>
        <View style={styles.avatarBackground}>
        {avatars[players[1].avatarIndex].value}
        </View>
        </>
        :<OfflineAvatar/>}
      </View>
      
      {initPlayersAmount >= 3 &&
      <View style={[styles.circleBottomLeft, styles.circle]}>
      {players[2] ?
      <>
        <Text style={styles.text}>{players[2].name}
          <Text style={styles.points}> {players[2].score}</Text>
        </Text>
        <View style={styles.avatarBackground}>
        {avatars[players[2].avatarIndex].value}
        </View>
        </>
        :<OfflineAvatar/>}
      </View>
      }

      {initPlayersAmount === 4 &&
      <View style={[styles.circleBottomRight, styles.circle]}>
      {players[3] ?
      <>
        <Text style={styles.text}>
          <Text style={styles.points}> {players[3].score} </Text>
          {players[3].name}
        </Text>
        <View style={styles.avatarBackground}>
        {avatars[players[3].avatarIndex].value}
        </View>
        </>
        :<OfflineAvatar/>}
      </View>
      }

      <QuestionComponent player={playerName} roomName={roomName} endGame={() =>setShowScores(true)}/>
      <PlayersScoresPopup players={players} playerLang={players.filter(player => player.name === playerName)[0].lang} visible={showScores} onBackToMainMenu={handleBackToMenu}/>
    </ImageBackground>
 </SafeAreaView>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    height: '100%', 
  },
  circle:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    minWidth: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    flexDirection:'column',
  },
  circleTopLeft: {
    top: 35,            
    left: 20,          
  },
  circleTopRight: {
    top: 35,
    right: 20,        
  },
  circleBottomLeft: {
    bottom: 20,       
    left: 20,
  },
  circleBottomRight: {
    bottom: 20,
    right: 20,
  },
  avatarBackground: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    flexWrap: 'nowrap',
  },
  points: {
    fontSize: 26,
  }
});

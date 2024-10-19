import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

interface Props {
  visible: boolean;
  players: { name: string; score: number }[];
  playerLang: string;
  onBackToMainMenu: () => void;
}

const PlayersScoresPopup: React.FC<Props> = ({ visible, players, playerLang, onBackToMainMenu }) => {

  const renderPlayer = ({ item }: { item: { name: string; score: number } }) => (
    <View style={styles.playerRow}>
      <Text style={styles.playerName}>{item.name}</Text>
      <Text style={styles.playerScore}>{item.score}</Text>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.modalBackground}>
        <View style={styles.popupContainer}>
          <Text style={styles.title}>{playerLang=='EN'?'Score':'Wyniki Graczy'}</Text>

          <FlatList
            data={players}
            keyExtractor={(item) => item.name} 
            renderItem={renderPlayer}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onBackToMainMenu}>
              <Text style={styles.buttonText}>{playerLang=='EN'?'Back to Main Menu':'Powrót'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    width: 350,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  playerName: {
    fontSize: 18,
    marginRight:10,
  },
  playerScore: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PlayersScoresPopup;

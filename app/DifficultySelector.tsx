import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import socket from '@/socket';

interface Props{
    roomName:string;
    lang:string;
    onDifficultyChange: (difficulty: string) => void;
}

const DifficultySelector = ({onDifficultyChange,roomName,lang}:Props) => {
  const [difficulty, setDifficulty] = useState('mix'); 

  
  const handleChange = (itemValue: string) => {
    socket.emit('change_difficulty', itemValue,roomName);
    setDifficulty(itemValue);
    onDifficultyChange(itemValue);
  };

  return (
    <View style={styles.columnBox}>
    <Text style={styles.label}>{lang=='EN'?'Select Difficulty':`Wybierz \n poziom  trudności`}</Text>
    <View style={styles.container}>
      <Picker
        selectedValue={difficulty}
        onValueChange={(itemValue) => {handleChange(itemValue)}}
        style={styles.picker}
        mode={"dialog"}
      >
        <Picker.Item label="Mix" value="mix" />
        <Picker.Item label={lang=='EN'?"Easy":'Łatwy'} value="easy" />
        <Picker.Item label={lang=='EN'?"Medium":'Średni'} value="medium" />
        <Picker.Item label={lang=='EN'?"Hard":'Trudny'} value="hard" />
      </Picker>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 50,
    marginTop:5,
    marginBottom:15,
    borderRadius: 10,
    backgroundColor:'white',
  },
  columnBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:'auto',
    height:50
  },
  label: {
    fontSize: 18,
    textAlign: 'center',
    color:'white',
  },
  picker: {
    zIndex: 3,
    height: 50,
    width:150,
    color: '#3b3b3b',
  },
});

export default DifficultySelector;

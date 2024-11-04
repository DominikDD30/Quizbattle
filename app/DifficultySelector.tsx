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
    <Text style={styles.label}>{lang=='EN'?'Difficulty':`Poziom  trudności`}</Text>
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
    width: 170,
    height: 50,
    marginTop:5,
    marginBottom:15,
    borderRadius: 10,

    backgroundColor:'white',
  },
  columnBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight:'auto',
    height:50,
    marginBottom:10,
  },
  label: {
    fontSize: 18,
    color:'white',
  },
  picker: {
    zIndex: 3,
    height: 50,
    width:170,
    color: '#3b3b3b',
  },
});

export default DifficultySelector;

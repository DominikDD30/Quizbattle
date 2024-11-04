import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import socket from '@/socket';
import TriviaCategories from './TriviaCategories';

interface Props{
    roomName:string;
    lang:string;
    onCategoryChange: (category: string) => void;
}

const CategorySelector = ({onCategoryChange,roomName,lang}:Props) => {
  const [category, setCategory] = useState<string>(''); 

  
  const handleChange = (itemValue: string) => {
    socket.emit('change_category', itemValue,roomName);
    setCategory(itemValue);
    onCategoryChange(itemValue);
  };

  return (
    <View style={styles.columnBox}>
    <Text style={styles.label}>{lang=='EN'?'Category':`Kategoria`}</Text>
    <View style={styles.container}>
    <Picker
      selectedValue={category}
      onValueChange={(itemValue) => handleChange(itemValue)}
      style={{ height: 50 }}
      mode="dialog"
    >
      {TriviaCategories.map((triviaCategory) => (
        <Picker.Item
          key={triviaCategory.id}
          label={lang === 'EN' ? triviaCategory.nameEN : triviaCategory.namePL}
          value={triviaCategory.id}
        />
      ))}
    </Picker>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 170,
    height: 50,
    borderRadius: 10,
    backgroundColor:'white',
  },
  columnBox: {
    flexDirection: 'column',
    marginRight:'auto',
    marginBottom:30,
    height:50
  },
  label: {
    fontSize: 18,
    marginBottom:5,
    color:'white',
  },
  picker: {
    zIndex: 3,
    height: 50,
    width:170,
    color: '#3b3b3b',
  },
});

export default CategorySelector;

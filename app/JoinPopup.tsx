import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Platform, ImageBackground } from 'react-native';
import avatarsSmall from './AvatarsSmall';

interface Props {
  visible: boolean;
  onJoin: (username: string,avatarIndex:number,language:string) => void;
}

const JoinPopup = ({ visible,  onJoin }:Props) => {
  const [username, setUsername] = useState('');
  const [position, setPosition] = useState(0);
  const [language, setLanguage] = useState('PL');
  const [activeIndex, setActiveIndex] = useState(1);
  const avatarWidth = 100;
  const avatarMargin = 10;

  const handleJoin = () => {
    if (username.trim()) {
      onJoin(username,activeIndex,language); 
      setUsername(''); 
    } else {
      alert(language === 'EN' ? 'Please introduce username' : 'Proszę podać nazwę użytkownika');
    }
  };

    const handleScroll = (event: { nativeEvent: { contentOffset: { x: any; }; }; }) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    setPosition(scrollPosition);
    if(scrollPosition < position){
      handleLowerScroll(scrollPosition);
    }else{
      handleUpperScroll(scrollPosition);
    }
    }

    const handleUpperScroll = (scrollPosition:number) => {
      if(scrollPosition > 130 * activeIndex) {
        setActiveIndex(activeIndex + 1);
     }
    } 

    const handleLowerScroll = (scrollPosition:number) => {
      if(scrollPosition < 90 * activeIndex) {
        setActiveIndex(activeIndex - 1);
     }
    }

    const toggleLanguage = () => {
      setLanguage(language === 'EN' ? 'PL' : 'EN');
    };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      
      <View style={styles.modalBackground}>
        <View style={styles.popupContainer}>
            <View style={styles.langBox}>
              <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={toggleLanguage} 
                >
                  <ImageBackground
                    source={language === 'EN'
                      ? require('../assets/images/eng.jpg') 
                      : require('../assets/images/pl.webp')  
                    }
                    style={{
                      width: 30,
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                  </ImageBackground>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>{language==='EN'?'Select Avatar':'Wybierz Avatar'}</Text>

          <View style={[styles.avatarContainer,{cursor:'pointer'}]}>
                  <ScrollView
                      scrollToOverflowEnabled={true}
                      horizontal
                      showsHorizontalScrollIndicator={Platform.OS == 'web'}
                      contentContainerStyle={styles.scrollContainer}
                      onScroll={handleScroll}
                      scrollEventThrottle={16}
                      snapToInterval={avatarWidth + avatarMargin}> 
              <View style={styles.avatar}></View>
                {avatarsSmall.map((avatar, index) => (
                  <View
                    key={index}
                    style={[
                      styles.avatar,
                      index === activeIndex && styles.activeAvatar, 
                    ]}
                  >
                    {avatar.value}
                  </View>
                ))}
                <View style={styles.avatar}></View>
              </ScrollView>
          </View>

          <TextInput
            style={styles.textInput}
            placeholder={language==='EN'?'Insert username':'Podaj nazwę użytkownika'}
            value={username}
            onChangeText={setUsername}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleJoin}>
              <Text style={styles.buttonText}>{language==='EN'?'Join':'Dołącz'}</Text>
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
    position: 'relative',
    width: 350,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarContainer: {
    marginBottom: 10,
  
    height: 100, 
    width: 300,
    overflow: 'hidden', 
  },
  avatar: {
    width: 100,
    height: 100,
    marginRight: 10,
    display:'flex',
    justifyContent:'center',
    opacity: 0.5,
    alignItems:'center' 
  },
  activeAvatar: {
    transform: [{ scale: 1.2 }],
    backgroundColor: 'rgba(137, 196, 244, 0.4)',
    opacity: 1,
  },
  scrollContainer: {
    flexDirection: 'row', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  langBox:{
    display:'flex',
    flexDirection:'row',
    position: 'absolute',
    alignItems:'center',
    top: 0,
    right: 0,
    margin: 5,
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'blue',
  },
});

export default JoinPopup;

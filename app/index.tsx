import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Platform} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import JoinPopup from './JoinPopup';
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

const Index: React.FC<Props> = ({ navigation }) => {
  const [popupVisible,setPopupVisible] = useState(true);
 
  useEffect(() => {
    if (Platform.OS !== 'web') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }
     
  }, []);

  

  const onJoin = (name:string,avatarIndex:number,language:string) => {
    setPopupVisible(false);
    navigation.navigate('start',{playerName:name,avatarIndex:avatarIndex,language:language});
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <ImageBackground
        source={require('../assets/images/logo7.jpg')}
        style={{ flex: 1,height:'100%',width:'100%', justifyContent: 'center', alignItems: 'center' }}
        resizeMode="cover"
      >
        <JoinPopup visible={popupVisible}  onJoin={onJoin}/>
      </ImageBackground>
    </SafeAreaView>
  );
};



export default Index;

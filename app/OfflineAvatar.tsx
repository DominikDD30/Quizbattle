import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import avatars from './Avatars';


const OfflineAvatar = () => {
  return (
    <>
        <Text style={styles.text}>
            Offline
        </Text>
        <View style={styles.avatarBackground}>
        {avatars[7].value}
        </View>
    </>
  );
};


const styles = StyleSheet.create({
    avatarBackground: {
      width: '100%',
      height: '100%',
    },
    text: {
      color: 'blue',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
  

export default OfflineAvatar;

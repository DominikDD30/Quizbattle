import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';

interface AvatarsComponentProps {
  avatarsSmall: { value: React.ReactNode }[];
}

const AvatarsComponent: React.FC<AvatarsComponentProps> = ({ avatarsSmall }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const avatarWidth = 100; 
  const avatarMargin = 10;
  const screenWidth = Dimensions.get('window').width; 

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }): void => {
    const scrollPosition = event.nativeEvent.contentOffset.x; 
    const centerPosition = scrollPosition + screenWidth / 2; 
    const active = Math.round(centerPosition / (avatarWidth + avatarMargin)); 
    setActiveIndex(active);
  };

  return (
    <View style={styles.avatarContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={avatarWidth + avatarMargin} 
        decelerationRate="fast"
      >
        {avatarsSmall.map((avatar:any, index:number) => (
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    height: 100,
    width: '100%',  
    overflow: 'hidden',
  },
  scrollContainer: {
    flexDirection: 'row', 
    paddingHorizontal: Dimensions.get('window').width / 2 - 55, 
  },
  avatar: {
    width: 100, 
    height: 100,
    marginRight: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 50,
  },
  activeAvatar: {
    backgroundColor: '#FFD700',
    transform: [{ scale: 1.2 }], 
  },
});

export default AvatarsComponent;

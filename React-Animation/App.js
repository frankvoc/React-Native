// App.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const App = () => {
  const [images, setImages] = useState([]);
  const translateX = useSharedValue(0); // Shared value to track translation

  // Fetch images from the API
  useEffect(() => {
    const fetchImages = () => {
      const imageArray = [];
      for (let i = 1; i <= 50; i++) {
        imageArray.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
      }
      setImages(imageArray);
    };
    fetchImages();
  }, []);

  // Gesture event handler for swipe
  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: false }
  );

  // Update translation based on swipe direction and velocity
  const handleGestureEnd = ({ nativeEvent }) => {
    const { translationX, velocityX } = nativeEvent;
    const threshold = width / 4; // Threshold for swipe action

    if (translationX < -threshold || velocityX < -500) {
      // Swipe left
      translateX.value = withSpring(translateX.value - width, {
        mass: 2, // Set realistic values for mass
        stiffness: 150,
        damping: 20,
      });
    } else if (translationX > threshold || velocityX > 500) {
      // Swipe right
      translateX.value = withSpring(translateX.value + width, {
        mass: 2,
        stiffness: 150,
        damping: 20,
      });
    } else {
      // Snap back to position
      translateX.value = withSpring(translateX.value, {
        mass: 2,
        stiffness: 150,
        damping: 20,
      });
    }
  };

  // Animated styles for the carousel
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // Render each image in the carousel
  const renderItem = ({ item }) => (
    <View style={[styles.imageContainer]}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={handleGesture}
        onEnded={handleGestureEnd}
      >
        <Animated.View style={[styles.carousel, animatedStyle]}>
          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false} // Disable scrolling to force swipe handling
          />
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carousel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 175,
  },
  image: {
    width: '90%',
    height: 300,
    borderRadius: 10,
  },
});

export default App;

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CurrentWeather from './CurrentWeather';

const Drawer = createDrawerNavigator();

const WeatherDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName='CurrentWeather'>
      <Drawer.Screen name ="CurrentWeather" component={CurrentWeather} options={{title: "Current Weather"}}/>

      {/* <Drawer.Screen name= "Forecast" component={() => <></>} options={{title: "Forecast"}}/> */}
    </Drawer.Navigator>
  )
}

const WeatherScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <WeatherDrawer />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  },
);

export default WeatherScreen;

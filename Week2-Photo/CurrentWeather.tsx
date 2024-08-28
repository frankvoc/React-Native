import weatherHook from './Custom-Hooks/weatherHook'
import React from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native'; 

const CurrentWeather = () =>{
  const {weather,loading,error} = weatherHook('Westerly');

  if(loading){
    return <Text>Loading... Please wait</Text>
  }

  if(error){
    return <Text>Error: {error}</Text>
  }

//weather
  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>{weather?.location.name}</Text>
      <Text style={styles.tempo}>{Math.round(weather.current.temp_f)}°</Text>
      <Image source={{ uri: `https:${weather?.current.condition.icon}`}} style={styles.weatherIcon}/>
      <Text style={styles.descriptionText}>{weather?.current.condition.text}</Text>
      <Text style={styles.descriptionText}>H:{Math.round(weather?.forecast.forecastday[0].day.maxtemp_f)}°    L:{Math.round(weather?.forecast.forecastday[0].day.mintemp_f)}°</Text>
      <Text style={styles.descriptionText}>Feels like: {Math.round(weather.current.feelslike_f)}°</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    weatherIcon: {
        width: 64,
        height: 64,
        marginVertical: 10,
      },
    locationText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    descriptionText: {
      fontSize: 18,
      marginVertical: 5,
    },
    tempo: {
      fontSize: 32,
      fontWeight: 'bold',
      marginVertical: 10,
    },
  });
export default CurrentWeather;
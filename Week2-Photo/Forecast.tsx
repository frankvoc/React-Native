import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import weatherHook from './Custom-Hooks/weatherHook';

const Forecast = ({route}:any)=>{
    const { weather, loading, error } = weatherHook('Westerly');
    const days = route.params?.days || 7;

    if(loading){
        return <Text>Loading... Please wait</Text>
      }
    
      if(error){
        return <Text>Error: {error}</Text>
      }
    
    const ForecastWeather = ({item}:any)=>(
        <View style={styles.forecastItem}>
            <Text style={styles.date}>{item.date}</Text>
            <Image source={{ uri: `https:${item.day.condition.icon}` }} style={styles.icon} />
            <Text style={styles.temp}>High: {Math.round(item.day.maxtemp_f)}°F</Text>
            <Text style={styles.temp}>Low: {Math.round(item.day.mintemp_f)}°F</Text>
            <Text style={styles.description}>{item.day.condition.text}</Text>
        </View>
    );
    return (
        <FlatList
        data={weather?.forecast.forecastday.slice(0, days)}
        renderItem={ForecastWeather}
        keyExtractor={(item) => item.date}
        />
    );
};
const styles = StyleSheet.create({
    forecastItem: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    date: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    icon: {
      width: 50,
      height: 50,
    },
    temp: {
      fontSize: 16,
    },
    description: {
      fontSize: 14,
      color: '#555',
    },
  });

export default Forecast;
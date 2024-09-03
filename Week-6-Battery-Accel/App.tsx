import React, {useEffect, useState, useRef} from "react";
import {View, Text, StyleSheet, Alert, Animated} from 'react-native';
import * as Battery from 'expo-battery';
import { Accelerometer } from "expo-sensors";

const BatteryAndAccel = () => {
  //Battery state
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState<boolean | null>(null);
  //detecting a shake
  const [shakeDetect, setShakeDetect] = useState<boolean | null>(null);

  //Accel State
  const [accelerometerData, setAccelerometerData] = useState<{ x: number; y: number; z: number }>({
    x: 0,
    y: 0,
    z: 0,
  });

  const batteryLevelBar = useRef(new Animated.Value(0)).current;

  //useEffect fetch battery
  useEffect(()=>{
    const fetchBatLevel = async () => {
      const initBatLevel = await Battery.getBatteryLevelAsync();
      const initBatState = await Battery.getBatteryStateAsync();
      setBatteryLevel(initBatLevel);
      setIsCharging(initBatState === Battery.BatteryState.CHARGING);
      batteryLevelBar.setValue(initBatLevel * 100);
    };

    fetchBatLevel();
    //BatteryInfo
    const batteryLevelSub = Battery.addBatteryLevelListener(({ batteryLevel })=>{
      setBatteryLevel(batteryLevel);
      Animated.timing(batteryLevelBar,{
        toValue: batteryLevel * 100,
        duration: 500,
        useNativeDriver: false
      }).start();
    });
    
    const batteryStateSub = Battery.addBatteryStateListener(({batteryState})=>{
      setIsCharging(batteryState === Battery.BatteryState.CHARGING);
    });
    //accel sub
    const accelerometerSub = Accelerometer.addListener((data)=>{
      setAccelerometerData(data);
      detectShake(data);
    });

    //accel update interval(1s)
    Accelerometer.setUpdateInterval(500);
    return () =>{
      batteryLevelSub.remove();
      batteryStateSub.remove();
      accelerometerSub && accelerometerSub.remove();
    };
  },[]);
  useEffect(()=>{
    if(batteryLevel !== null && batteryLevel >= 1){
      Alert.alert("Full Battery!");
    }
  },[batteryLevel]);
  const detectShake = (data: {x: number; y: number; z:number;})=>{
    const totalForce = Math.sqrt(data.x * data.x + data.y * data.y + data.z * data.z);
    if (totalForce > 1.65){
      if(!shakeDetect){
        setShakeDetect(true);
        handleShake();
      }
    }else{
      setShakeDetect(false);
    }
  };
  const handleShake = () =>{
    if(batteryLevel !== null && batteryLevel < 1){
      setBatteryLevel((prevLevel)=>{
        const newLevel = Math.min(prevLevel + 0.01, 1);
        Animated.timing(batteryLevelBar,{
          toValue: newLevel * 100,
          duration: 500,
          useNativeDriver: false
        }).start();
        return newLevel;
      });
    }
  };

  const getBatteryLevelProg = () => (batteryLevel !== null ? `${(batteryLevel * 100).toFixed(2)}%` : 'Loading...');
  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar,{width: batteryLevelBar.interpolate({
          inputRange:[0,100],
          outputRange:['0%', '100%'],
        })}]}/>
      </View>
      {/* Battery Info */}
        <Text style={styles.text}>
          Battery Level: {getBatteryLevelProg()}
        </Text>
        <Text style={styles.text}>
          Charging: {isCharging !== null ? (isCharging ? 'Yes' : 'No' ) : 'Loading...'}
        </Text>
        {/*Accel Information*/}
      <Text style={styles.text}>Accelerometer</Text>
      <Text style={styles.text}>x: {accelerometerData.x.toFixed(2)}</Text>
      <Text style={styles.text}>y: {accelerometerData.y.toFixed(2)}</Text>
      <Text style={styles.text}>z: {accelerometerData.z.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  progressBarContainer: {
    height: 20,
    width: '80%',
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
});
export default BatteryAndAccel;
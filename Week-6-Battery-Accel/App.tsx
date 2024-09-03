import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from 'react-native';
import * as Battery from 'expo-battery';
import { Accelerometer } from "expo-sensors";

const BatteryAndAccel = () => {
  //Battery state
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState<boolean | null>(null);

  //Accel State
  const [accelerometerData, setAccelerometerData] = useState<{ x: number; y: number; z: number }>({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(()=> {
    //BatteryInfo
    const getBatteryInformation = async () => {
      const level = await Battery.getBatteryLevelAsync();
      const charging = await Battery.getBatteryStateAsync();
      setBatteryLevel(level);
      setIsCharging(charging === Battery.BatteryState.CHARGING);
    };
    getBatteryInformation();
    //Subscribe to battery and state changes
    const batteryLevelSub =  Battery.addBatteryLevelListener(({ batteryLevel })=>{
      setBatteryLevel(batteryLevel);
    });
    const batteryStateSub = Battery.addBatteryStateListener(({batteryState})=>{
      setIsCharging(batteryState === Battery.BatteryState.CHARGING);
    });
    //accel sub
    const accelerometerSub = Accelerometer.addListener((data)=>{
      setAccelerometerData(data);
    });

    //accel update interval(1s)
    Accelerometer.setUpdateInterval(100);
    return () =>{
      batteryLevelSub.remove();
      batteryStateSub.remove();
      accelerometerSub && accelerometerSub.remove();
    };
  },[]);

  return (
    <View style={styles.container}>
      {/* Start of Battery */}
      <Text style={styles.text}>
        BatteryLevel: {batteryLevel !== null ? `${(batteryLevel * 100).toFixed(0)}%` : 'Loading...'}
      </Text>
      <Text style={styles.text}>
        Charging: {isCharging !== null ? (isCharging ? 'Yes' : 'No'): 'Loadiing'}
      </Text>
      {/* Start of Accel */}
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
})
export default BatteryAndAccel;
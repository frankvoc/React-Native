import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from 'react-native';
import * as Battery from 'expo-battery';

const App = () => {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState<boolean | null>(null);

  useEffect(()=> {
    const getBatteryInformation = async () => {
      const level = await Battery.getBatteryLevelAsync();
      const charging = await Battery.getBatteryStateAsync();
      setBatteryLevel(level);
      setIsCharging(charging === Battery.BatteryState.CHARGING);
    };
    getBatteryInformation();

    const batteryLevelSub =  Battery.addBatteryLevelListener(({ batteryLevel })=>{
      setBatteryLevel(batteryLevel);
    });
    const batteryStateSub = Battery.addBatteryStateListener(({batteryState})=>{
      setIsCharging(batteryState === Battery.BatteryState.CHARGING);
    });
    return () =>{
      batteryLevelSub.remove();
      batteryStateSub.remove();
    };
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        BatteryLevel: {batteryLevel !== null ? `${(batteryLevel * 100).toFixed(0)}%` : 'Loading...'}
      </Text>
      <Text style={styles.text}>
        Charging: {isCharging !== null ? (isCharging ? 'Yes' : 'No'): 'Loadiing'}
      </Text>
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
export default App;
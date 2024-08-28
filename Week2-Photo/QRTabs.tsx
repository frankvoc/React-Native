import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BarcodeScannerScreen from "./BarCode";
import Favorites from "./Favorites";
import Icon from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();

const QRTabs = () => {
    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
    
              if (route.name === 'BarCode') {
                iconName = 'camera';
              } else if (route.name === 'Favorites') {
                iconName = 'star';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarLabelStyle: { fontSize: 12 },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="BarCode" component={BarcodeScannerScreen} options={{ title: 'Scanner',headerShown:false }} />
          <Tab.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }} />
        </Tab.Navigator>
      );
    };
export default QRTabs;
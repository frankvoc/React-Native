import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Forecast from './Forecast';

const Tab = createMaterialTopTabNavigator();

const ForecastTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="3 Day"
        component={Forecast}
        initialParams={{ days: 3 }}
      />
      <Tab.Screen
        name="7 Day"
        component={Forecast}
        initialParams={{ days: 7 }}
      />
    </Tab.Navigator>
  );
};

export default ForecastTabs;

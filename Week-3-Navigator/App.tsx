import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Tab = createBottomTabNavigator();
//const Drawer = createDrawerNavigator();
export default function App(){
  return(
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;
      
            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Details') {
              iconName = focused ? 'reader' : 'reader-outline';
            }
      
            // You can return any component that you like here
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Details" component={DetailsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export type StackParamList = {
  Home: undefined;
  Details: { itemId: number; otherParam?: string };
  ModalScreen: undefined;
  Extras: undefined;
}

type DetailsScreenNavigation = StackNavigationProp<StackParamList, 'Details'>;
type HomeScreenNavigationProp = StackNavigationProp<StackParamList, 'Home'>;
type DetailsScreenRouteProp = RouteProp<StackParamList, 'Details'>;
type ExtrasScreenNavigationProp = StackNavigationProp<StackParamList, 'Extras'>;

const stack = createStackNavigator<StackParamList>();


export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      {/* <Button
        title="Go to Modal"
        onPress={() => navigation.navigate('ModalScreen')}
      /> */}
    </View>
  );
}
export function DetailsScreen() {
  const { params } = useRoute<DetailsScreenRouteProp>();
  const navigation = useNavigation<DetailsScreenNavigation>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}
export function ModalScreen() {
  const navigation = useNavigation<DetailsScreenNavigation>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is a Modal Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', { itemId: 123, otherParam: 'test' })
        }
      />
    </View>
  );
}

export function ExtrasScreen() {
  const navigation = useNavigation<ExtrasScreenNavigationProp>();
  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: 'lightblue' },
      headerTitle: 'Extras Screen',
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Extras Screen</Text>
      <Button
        title="Set Header to Red"
        onPress={() => {
          navigation.setOptions({
            headerStyle: { backgroundColor: 'red' },
            headerTitle: 'Red Header',
          });
        }}
      />
      <Button
        title="Set Header to Green"
        onPress={() => {
          navigation.setOptions({
            headerStyle: { backgroundColor: 'green' },
            headerTitle: 'Green Header',
          });
        }}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

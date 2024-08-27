import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, FlatList, Image, TouchableOpacity, Modal, StyleSheet, Platform, Text, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WeatherScreen from './Weather';
import BarCodeScreen from './BarCode';
import ProductsDetails from './ProductsDetails';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

interface ImageData {
  id: number;
  url: string;
}

const imageData: ImageData[] = [];
for (let i = 1; i < 71; i++) {
  imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
}

const HomeScreen = ({ navigation }: any) => {
  const [filteredPhotos, setFilteredPhotos] = useState<ImageData[]>(imageData);
  //const [selectedPhoto, setSelectedPhoto] = useState<ImageData | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    setFilteredPhotos(
      imageData.filter(photo => photo.id.toString().includes(searchTerm))
    );
  }, [searchTerm]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by ID."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredPhotos}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PhotoDetail', { photo: item })}>
            <Image source={{ uri: item.url }} style={styles.photo} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
const PhotoDetailScreen = ({ route }: any) => {
  const { photo } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  return(
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={{uri: photo.url}} style={styles.largePhoto}/>
      </TouchableOpacity>
      <Text style={styles.photoDescription}>{photo.url}</Text>
      <Text style={styles.photoDescription}>Hardcoded</Text>
      <Modal
        animationType="slide"
        visible = {isModalVisible}
        transparent = {true}
        onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Button title="Close" onPress={() => setModalVisible(false)} color="white" />
          </View>
          <View style={styles.modalContent}>
            <Image source={{ uri: photo.url }} style={styles.fullScreenPhoto} />
            </View>
            </View>
            
        </Modal>
    </SafeAreaView>
  );
};


const DrawerContent = ({ navigation }: any) => (
  <View style={styles.drawerContent}>
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Text style={styles.drawerItem}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Weather')}>
      <Text style={styles.drawerItem}>Weather</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('BarCode')}>
      <Text style={styles.drawerItem}>BarCode</Text>
    </TouchableOpacity>
  </View>
);

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
      name ="PhotoDetail"
      component={PhotoDetailScreen}
      options={({ route }) => ({
        title: route.params.photo.url,
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'white',
      })} 
      />
      <Stack.Screen
        name="Weather"
        component={WeatherScreen}
      />
      <Stack.Screen
        name="BarCode"
        component={BarCodeScreen}
      />
      <Stack.Screen
        name="ProductsDetails"
        component={ProductsDetails}
        options={{title: 'Product Details'}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props: any) => <DrawerContent {...props} />}
        screenOptions={{
          drawerPosition: 'right',
          headerShown:false,
          drawerType: 'slide',
        }}
      >
        <Drawer.Screen name="Main" component={MainStack} />
        <Drawer.Screen name="Weather" component={WeatherScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  searchInput: {
    height: 40,
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  photo: {
    width: 120,
    height: 100,
    margin: 5,
  },
  largePhoto: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'black',
  },
  modalHeader: {
    height: 75,
    backgroundColor: 'black',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop:20,
  },
  closeButton: {
    color: 'white',
    fontSize: 24,
    marginTop:25
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor:'black'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  drawerContent: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  drawerItem: {
    padding: 20,
    fontSize: 18,
  },
  photoDescription: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});

export default App;

import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, FlatList, Image, TouchableOpacity, Modal, StyleSheet, Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

interface ImageData {
  id: number;
  url: string;
}
const imageData: ImageData[] = [];
for (let i = 1; i < 71; i++) {
  imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200`});
}

const App = () => {
  const [filteredPhotos, setFilteredPhotos] = useState<ImageData[]>(imageData);
  const [selectedPhoto, setSelectedPhoto] = useState<ImageData | null>(null);
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
        onChangeText={setSearchTerm}/>
      <FlatList
        data={filteredPhotos}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedPhoto(item)}>
            <Image source={{ uri: item.url }} style={styles.photo} />
          </TouchableOpacity>
        )}/>
      {selectedPhoto && (
        <Modal
          onRequestClose={() => setSelectedPhoto(null)}
        >
          <View style={styles.modalBackground}>
            <TouchableOpacity onPress={() => setSelectedPhoto(null)}>
              <Image source={{ uri: selectedPhoto.url }} style={styles.largePhoto} />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
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
    ...Platform.select({
      android:{
        marginTop:30,
      }
    })
  },
  photo: {
    width: 120,
    height: 100,
    margin: 5,
    ...Platform.select({
      android:{
        margin:5,
      },
    }),
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largePhoto: {
    width: 300,
    height: 300,
  },
});

export default App;

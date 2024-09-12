import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
type FavoriteScreenNavProp = StackNavigationProp<RootStackParamList, 'Favorites'>;
interface Product {
    url: string;
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    rating: string;
    thumbnail: string;
}
const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const navigation = useNavigation<FavoriteScreenNavProp>();


    const fetchFavorites = useCallback(async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            console.log('Stored Favorites:', storedFavorites);
            const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
            setFavorites(parsedFavorites);
        } catch (error) {
            console.log(error);
        }
    }, []);
    useFocusEffect(fetchFavorites);
    const itemClick = (product: Product) => {
        navigation.navigate('ProductsDetails', { url: product.url });
    };
    const renderFavoriteItem = ({ item }: { item: Product }) => (
        <TouchableOpacity onPress={() => itemClick(item)} style={styles.itemContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.title}>${item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {favorites.length === 0 ? (
                <Text style={styles.emptyText}>No favorites</Text>
            ) : (
                <FlatList
                    data={favorites}
                    renderItem={renderFavoriteItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    thumbnail: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#888',
    },
});

export default Favorites;

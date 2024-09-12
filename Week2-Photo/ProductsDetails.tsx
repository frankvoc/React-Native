import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductsDetails'>;

interface ProductDetailScreenProps {
    route: ProductDetailRouteProp;
}

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    rating: string;
    thumbnail: string;
    url: string;
}

const ProductDetail: React.FC<ProductDetailScreenProps> = ({ route }) => {
    const { url } = route.params;
    const [fetchedProduct, setFetchedProduct] = useState<Product | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);
    const testurl = 'https://dummyjson.com/products/3';
    useEffect(() => {
        fetchProduct(testurl);
    }, [url]);
    useEffect(() => {
        if (fetchedProduct) {
            checkIfFavorite(fetchedProduct.id);
        }
    }, [fetchedProduct]);

    const fetchProduct = async (url: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data: Product = await response.json();
            setFetchedProduct(data);
        } catch (error) {
            console.error('Failed to fetch product:', error);
            setFetchedProduct(null);
        } finally {
            setLoading(false);
        }
    };

    const checkIfFavorite = async (productId: number) => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
            setIsFavorite(favorites.some((item: Product) => item.id === productId));
        } catch (error) {
            console.error('Error checking if favorite:', error);
        }
    };

    const toggleFavorite = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
            if (isFavorite) {
                favorites = favorites.filter((item: Product) => item.id !== fetchedProduct?.id);
            } else {
                if (fetchedProduct) {
                    favorites.push(fetchedProduct);
                }
            }
            await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!fetchedProduct) {
        return <Text>Something went wrong</Text>;
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: fetchedProduct.thumbnail }} style={styles.thumbnail} />
            <Text style={styles.name}>{fetchedProduct.title}</Text>
            <Text style={styles.category}>{fetchedProduct.category}</Text>
            <Text style={styles.description}>Rating: {fetchedProduct.rating}</Text>
            <Text style={styles.price}>${fetchedProduct.price}</Text>
            <Text style={styles.description}>{fetchedProduct.description}</Text>
            <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                <Icon name={isFavorite ? 'star' : 'star-o'} size={30} color="#FFD700" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    thumbnail: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    category: {
        fontSize: 16,
        color: '#888',
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#e63946',
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    favoriteButton: {
        alignItems: 'center',
        marginTop: 20,
    },
});

export default ProductDetail;

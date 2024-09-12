
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    BarCode: undefined;
    ProductsDetails: { product: string };
    Favorites: undefined;
};

export type ProductsDetailsScreenProp = StackNavigationProp<RootStackParamList, 'ProductsDetails'>;
export type ProductsDetailsRouteProp = RouteProp<RootStackParamList, 'ProductsDetails'>;

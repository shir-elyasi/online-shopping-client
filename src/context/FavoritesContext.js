import React, { useContext, useState, useEffect, useReducer} from 'react';
import { initialState, favoritesReducer} from "../reducers/favorites.reducers"
import { FETCH_DATA_FAVORITES } from "../reducers/favorites.actions"

const FavoritesContext = React.createContext();

export function useFavorites() {
    return useContext(FavoritesContext)
}

export function FavoritesProvider({children}) {
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [favoritesState, favoritesDispatch] = useReducer(favoritesReducer, initialState);


    useEffect(() => {
        const favoriteProducts = localStorage.getItem('favoriteProducts');
        if (favoriteProducts !== null) {
            favoritesDispatch({type: FETCH_DATA_FAVORITES, payload: favoriteProducts})
        }
    }, [favoritesDispatch])

    useEffect(() => {
        localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
    },[favoriteProducts])

    const handleChangeFavorites = (product, toFavorite) => {
        let updatedFavoriteProducts = [...favoriteProducts];
        if (toFavorite){
            updatedFavoriteProducts.push(product);
        }
        else{
            updatedFavoriteProducts = updatedFavoriteProducts.filter(element => element.id !== product.id)
        }
        
        setFavoriteProducts(updatedFavoriteProducts)
    }

    const value = {
        favoriteProducts,
        handleChangeFavorites,
        favoritesState, 
        favoritesDispatch
    }

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

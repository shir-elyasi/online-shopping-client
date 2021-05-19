import React, { useContext, useState, useEffect} from 'react';

const FavoritesContext = React.createContext();

export function useFavorites() {
    return useContext(FavoritesContext)
}

export function FavoritesProvider({children}) {
    const [favoriteProducts, setFavoriteProducts] = useState([]);


    useEffect(() => {
        const favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts'));
        if (favoriteProducts !== null) {
            setFavoriteProducts(favoriteProducts)
        }
    }, [])

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
        handleChangeFavorites
    }

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

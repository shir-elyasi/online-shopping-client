import React from 'react'
import FavoriteProduct from './FavoriteProduct'
import { useFavorites } from '../../context/FavoritesContext';
import { Container } from 'react-bootstrap';


export default function Favorites() {
    const { favoriteProducts } = useFavorites();

    return (
        <div>
            <Container className="d-flex flex-column justify-content-center align-items-center py-5">
                <h1>WISHLIST</h1>
                {
                    favoriteProducts.length > 0 ? 
                    <div className="row py-5">
                        {favoriteProducts.map((favoriteProduct, index) =>
                            <FavoriteProduct key={index} favoriteProduct={favoriteProduct} />
                        )}
                    </div>
                    : 
                    <p className="py-4">There are no products on your whshlist</p>
                } 
            </Container>
        </div>
    )
}
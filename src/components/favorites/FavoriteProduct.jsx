import React from 'react'
import { Card, CardGroup } from 'react-bootstrap'
import { useFavorites } from '../../context/FavoritesContext';
import { Link } from 'react-router-dom'
import '../../css/favorite.css';


export default function FavoriteProduct(props) {
    const { handleChangeFavorites } = useFavorites();

    const price = props.favoriteProduct.price;
    const discount = props.favoriteProduct.discount;
    const name = props.favoriteProduct.name;

    return (
        <CardGroup>
            <div className="col-6 col-md-3">
                <Card className="text-center" style={{ width: '14rem' , border: 'none'}}>
                    <button type="button" className="btn btn-outline-dark rounded-circle px-2 py-1" 
                        onClick={() => handleChangeFavorites(props.favoriteProduct, false)} 
                        style={{border: 'none', position:"absolute"}}>
                        <i className="fas fa-heart"></i>
                    </button>

                    <Link to={`/${props.favoriteProduct.name.replace(' ', '_')}`} className="link">
                        <Card.Img variant="top" src={props.favoriteProduct.product_images[0]} />
                        <Card.Body className="py-1">
                            {discount > 0 ?
                                <p className="text-success my-1">{discount * 100}% DISCOUNT</p>
                            : null 
                            }
                            <p className="my-1">{name}</p>
                            <div className="d-flex justify-content-center">
                                <p style={discount > 0 ? {textDecorationLine: 'line-through'} : {}}>{price}$</p>
                                {discount > 0 ?
                                    <p className="ml-2 text-success">{price * (1 - discount)}$</p>
                                : null
                                }
                            </div>
                            
                        </Card.Body>
                    </Link>
                </Card>
            </div>
        </CardGroup>
    )
}
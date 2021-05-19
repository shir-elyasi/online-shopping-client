import React, { useRef, useEffect } from 'react';
import {Form, Button} from 'react-bootstrap';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Product from './Product.jsx';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useStore } from '../../context/StoreContext';


export default function ProductPage(props) {
    const { handleAddToCart } = useCart();
    const { handleChangeFavorites, favoriteProducts } = useFavorites();
    const qtyRef = useRef();
    const { products } = useStore();


    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    const createStars = () => {
        let fiveStars = []
        for (let j = 0; j < 5; j++) {
            if (j<props.product.stars)
                fiveStars.push(<i className="fas fa-star" key={j}></i>);
            else
            fiveStars.push(<i className="far fa-star" key={j}></i>);
        }
        return fiveStars;
    };

    const createQtyList = () => {
        const qtyList = [];
        for(let i=1; i<=10; i++){
            qtyList.push(<option key={i}>{i}</option>);
        }
        return qtyList;
    }

    const isInStock = () => {
        if (props.product.inStock)
            return <h4 className="text-success">In Stock</h4>
        else
            return <h4 className="text-danger">Out of Stock</h4>
    }

    const isFavorite = () => {
        if (favoriteProducts){
            const isFavoriteProduct = favoriteProducts.filter(element => element.id === props.product.id);
            if (isFavoriteProduct.length === 0){
                return <i id="favoriteIcon" className="far fa-heart ml-2" onClick={() => handleChangeFavorites(props.product, true)}></i>
            }
            else {
                return <i id="favoriteIcon" className="fas fa-heart ml-2" onClick={() => handleChangeFavorites(props.product, false)}></i>
            }
        }
        else {
            return <i id="favoriteIcon" className="far fa-heart ml-2" onClick={() => handleChangeFavorites(props.product, true)}></i>
        }
    }

    const displayPrice = () => {
        if(props.product.discount !== 0) {
            return (<div className="my-3">
                        <h4>{props.product.discount * 100}% OFF</h4>
                        <h4><span style={{textDecoration: "line-through"}}>${props.product.price}</span> ${props.product.price * (1- props.product.discount)}</h4>
                    </div>)
        }
        else {
            return <h3 className="my-3">${props.product.price}</h3>
        }
    }

    function getRelatedProducts() {
        console.log(products)
        if (products)
            return products.filter(element => element.categories.parent === props.product.categories.parent && element._id !== props.product._id);
        return [];
    }


    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-12 col-md-6 px-5 product-image">
                    <div>
                        <Carousel>
                            {props.product.product_images.map((image, index) => (
                                <div key={index}>
                                    <img src={image} alt="carousel_image" />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
                <div className="col-12 col-md-6 px-4 product-details">
                    <div id="ProductTitle" className="mt-5">
                        <h1>{props.product.name}</h1>
                        {createStars()}
                        {displayPrice()}
                    </div>
                    <Form>
                        <Form.Group controlId="qty" className="d-inline-flex">
                            <Form.Label className="p-2">Qty:</Form.Label>
                            <Form.Control as="select" className="p-2 col-sm-8" ref={qtyRef}>
                            {createQtyList()}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <div className="d-flex align-items-center">
                        <Button variant="primary" className="px-5" onClick={() => handleAddToCart(props.product, qtyRef.current.value)}>
                            Add to cart
                        </Button>
                        {isFavorite()}
                    </div>
                    <div id="ProductOtherDetails" className="mt-5">
                        {isInStock()}
                        <p><strong>Description:</strong> {props.product.description}</p>
                    </div>
                    <div>
                        <p className="mb-2">
                            <strong>Related Items:</strong>
                        </p>
                        <div className="row">
                            {getRelatedProducts().map(productElement => 
                                <Product key={productElement.id} productElement={productElement}/>
                            )}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

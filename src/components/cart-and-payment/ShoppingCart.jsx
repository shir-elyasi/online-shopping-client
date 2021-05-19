import React from 'react';
import {Link} from 'react-router-dom';
import CartProduct from './CartProduct.jsx';
import OrderSummary from './OrderSummary.jsx';
import { useCart } from '../../context/CartContext';


export default function ShoppingCart() {
    const { cartState } = useCart();

    return (
        <div className="container py-5">
            <h2 className="text-center mb-5">Shopping Cart</h2>
            <div className="row">
                <div className="col-12 col-md-8">
                    {cartState.data.map(cartProduct => 
                    <CartProduct 
                        key={cartProduct.id} 
                        cartProduct={cartProduct} 
                    />)}
                </div>
                <div className="col-12 col-md-4">
                    <div className="border py-3 px-3" style={{borderColor: '#e6e6e6'}}>
                        
                        <OrderSummary />
                        
                        <div className="text-center">
                            <Link to="/payment">
                            <button type="button" className="btn btn-primary  w-100">Check-Out</button>
                            </Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}


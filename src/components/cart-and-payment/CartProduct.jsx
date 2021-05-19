import React, { useRef } from 'react';
import { useCart } from '../../context/CartContext';


export default function CartProduct(props) {
    const qtyRef = useRef();
    const { handleDeleteCartProduct, handleQtyChange } = useCart();


    const createQtyList = () => {
        const qtyList = [];
        for(let i=1; i<=10; i++) {
            qtyList.push(<option key={i} value={i}>{i}</option>);
        }
        return qtyList;
    }

    const getActualPrice = () => {
        return props.cartProduct.price * (1- props.cartProduct.discount);
    }

        
    return (
        <div className="card mb-3" style={{maxWidth: "750px"}}>
            <div className="row g-0">
                <div className="col-2">
                    <img src={props.cartProduct.product_images[0]} alt="..." style={{maxHeight:"100%", maxWidth:"100%"}}></img>
                </div>
                <div className="col-10">
                    <div className="card-body">
                        <div className="d-flex justify-content-between border-bottom">
                            <h5 className="card-title">{props.cartProduct.name}</h5>
                            <button type="button" className="btn btn-danger py-0 px-1" 
                                    onClick={() => handleDeleteCartProduct(props.cartProduct)}
                                    style={{maxHeight:'25px', maxWidth:'25px'}}
                                ><i className="fas fa-times" style={{fontSize: '15px'}}></i></button>
                        </div>
                        <div className="row mt-2">
                            <div className="col-6 col-md-4">
                                <p className="card-text">price: <del>${props.cartProduct.price}</del> ${(getActualPrice()).toLocaleString()}</p>
                            </div>
                            <div className="col-6 col-md-4">
                                <form>
                                    <label htmlFor="qtyCart" className="card-text mr-1">qty: </label>
                                    <select name="qtyCart" value={props.cartProduct.quantity} ref={qtyRef} onChange={() => handleQtyChange(props.cartProduct, qtyRef.current.value)}>
                                        {createQtyList()}
                                    </select>
                                </form>
                            </div>
                            <div className="col-6 col-md-4">
                                <p className="card-text">Total: ${(props.cartProduct.quantity * getActualPrice()).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
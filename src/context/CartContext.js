import React, { useContext, useState, useEffect, useReducer} from 'react';
import axios from 'axios';
import { initialState, cartReducer } from '../reducers/cart.reducer';
import { FETCH_DATA_CART, ADD_TO_CART, CHANGE_QUANTITY, DELETE_PRODUCT } from '../reducers/cart.actions';

const CartContext = React.createContext();

export function useCart() {
    return useContext(CartContext)
}

export function CartProvider({children}) {
    const [displayAlert, setDisplayAlert] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const [myCoupon, setMyCoupon] = useState({});
    const tax = 0.17;

    const [cartState, cartDispatch] = useReducer(cartReducer, initialState);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PROXY}/coupons`)
        .then(res => {
            setCoupons(res.data);        
        })

        const coupon = JSON.parse(localStorage.getItem('myCoupon'));
        if (coupon){
            setMyCoupon(coupon);
        }  

    }, [])

    useEffect(() => {
        const cartProducts = localStorage.getItem('cartProducts');
        if (cartProducts !== null) {
            cartDispatch({type: FETCH_DATA_CART, payload: cartProducts})
        }
    }, [cartDispatch])

    
    useEffect(() => {
        localStorage.setItem('cartProducts', JSON.stringify(cartState.data));
    },[cartState])


    const handleAddToCart = (product, qty) => {
        setDisplayAlert(true);
        setTimeout(() => {
            setDisplayAlert(false);
        }, 5000);

        cartDispatch({type: ADD_TO_CART, product, qty })
    }

    const handleQtyChange = (product, qty) => {
        cartDispatch({type: CHANGE_QUANTITY, product, qty })
    }

    const handleDeleteCartProduct = (product) => {
        cartDispatch({type: DELETE_PRODUCT, product })
    }

    const calculateSumQtyCart = () => {
        return cartState.data.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.quantity), 0)
    }

    const getSubTotalAmount = () => {
        return cartState.data.reduce((accumulator, currentValue) => 
        accumulator + (currentValue.price * (1-currentValue.discount) * currentValue.quantity), 0);
    }

    const getTaxesAmount = () => {
        return getSubTotalAmount() * tax;
    }

    const getTotalAfterTaxes = () => {
        return getSubTotalAmount() + getTaxesAmount();
    }

    const getCouponDiscountAmount = () => {
        return getTotalAfterTaxes() * myCoupon.discount;
    }

    const getTotalBeforeDelivert = () => {
        if (myCoupon.code)
            return getTotalAfterTaxes() * (1 - myCoupon.discount);
        else
            return getTotalAfterTaxes();
    }

    const activateCoupon = (couponCode) => {
        
        coupons.forEach(element => {
            if (element.code === couponCode) {
                const coupon = {code: element.code, discount: element.discount}
                setMyCoupon(coupon);
                localStorage.setItem('myCoupon', JSON.stringify(coupon));
                return true
            }
        });

        return false;
    }

    const cancelCoupon = () => {
        setMyCoupon({});
        localStorage.removeItem('myCoupon')
    }

    const value = {
        displayAlert,
        tax,
        myCoupon,
        handleAddToCart,
        handleQtyChange,
        handleDeleteCartProduct,
        calculateSumQtyCart,
        setDisplayAlert,
        getSubTotalAmount,
        getTaxesAmount,
        getTotalAfterTaxes,
        getCouponDiscountAmount,
        getTotalBeforeDelivert,
        activateCoupon,
        cancelCoupon,
        setMyCoupon,
        coupons,
        cartState,
        cartDispatch
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

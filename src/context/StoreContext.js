import React, { useContext, useState, useEffect} from 'react';
import axios from 'axios';

const StoreContext = React.createContext();

export function useStore() {
    return useContext(StoreContext)
}

export function StoreProvider({children}) {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => { 
        axios.get(`${process.env.REACT_APP_PROXY}/categories`)
        .then(res => {
            setCategories(res.data);
        })

        axios.get(`${process.env.REACT_APP_PROXY}/products`)
        .then(res => {
            setProducts(res.data);
        })

        axios.get(`${process.env.REACT_APP_PROXY}/orders`)
        .then(res => {
            setOrders(res.data);        
        })
    }, [])


    const value = {
        categories,
        products,
        orders,
        setCategories,
        setProducts,
        setOrders
    }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
}

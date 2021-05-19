import React from 'react'
import {Alert} from 'react-bootstrap'
import { useCart } from '../context/CartContext';

export default function AlertBox() {
    const { displayAlert, setDisplayAlert} = useCart()

    if (displayAlert) {
        return (
        <Alert variant="success" onClose={() => setDisplayAlert(false)} dismissible>
            The product was successfully added to the shopping cart
        </Alert>
        );
    }
    else {
        return <div></div>
    }
}

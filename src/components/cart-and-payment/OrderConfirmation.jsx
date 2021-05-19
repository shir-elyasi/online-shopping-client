import React from 'react';

export default function OrderConfirmation(props) {

    return (
        <div className="container py-5">
            <h1>Order Confirmation</h1>
            <h3>Order Id: {props.location.state.order_id}</h3>
        </div>
    );
}

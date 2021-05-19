import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Container, Table } from 'react-bootstrap'
import axios from 'axios';


export default function ProfileOrders() {
    const { currentUser, getAuthHeaders } = useAuth();
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        if (currentUser){
            axios.get(`${process.env.REACT_APP_PROXY}/orders/user/${currentUser._id}`, {}, {headers: getAuthHeaders()})
            .then(res => {
                setUserOrders(res.data);        
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    return (
        <div>
            {userOrders.length > 0 ? 
                <Container>
                    <h3 className="mb-3">Orders</h3>
                    {userOrders.map(order => (
                        <div className="mb-4">
                            <div className="d-flex">
                                <p><b>Order Id: </b>{order._id}</p>
                                <p className="ml-3"><b>Status: </b> {order.status}</p>
                                <p className="ml-3"><b>Total: </b>${order.totalAmount}</p>
                                <p></p>
                            </div>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th></th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {order.products.map((product, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{(product.price * (1 - product.discount)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td>{product.quantity}</td>
                                        <td>${(parseInt(product.quantity) * (product.price * (1 - product.discount))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    </tr>
                                ))}
                            </tbody>
                            </Table>
                        </div>
                        
                        
                    ))}
                </Container>
            : ''}
        </div>
    )
}

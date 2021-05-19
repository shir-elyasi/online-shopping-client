import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/collapse';
import '../css/header.css';
import $ from 'jquery';
import CartProduct from './cart-and-payment/CartProduct.jsx';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';


export default function Header() {
    const { currentUser, logout } = useAuth();
    const { cartState, calculateSumQtyCart } = useCart();
    const { favoriteProducts } = useFavorites();

    const searchInputRef = useRef();
    const modalCartRef = useRef();

    const [searchInput, setSearchInput] = useState('')
    

    async function handleLogout() {
        try {
            await logout()
        }
        catch(err){
            console.log(err)
        }
    }

    const onSetSearchInput = () => {
        var value = searchInputRef.current.value.replace(/[^A-Za-z]/ig, '');
        searchInputRef.current.value = value;
        setSearchInput(value);
    }

    const setCartModal = () => {
        return (
            <div className="modal fade" id="cartModal" ref={modalCartRef} tabIndex="-1" role="dialog" aria-labelledby="modalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLongTitle">Shopping Cart</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {cartState.data.map(cartProduct => 
                                <CartProduct 
                                    key={cartProduct.id} 
                                    cartProduct={cartProduct} 
                                />)
                            }
                        </div>
                        <div className="modal-footer"> 
                            <Link to="/cart"><button type="button" className="btn btn-primary" onClick={() => $(modalCartRef.current).modal('hide')}>Full shopping cart</button></Link>
                            <Link to="/payment"><button type="button" className="btn btn-primary" onClick={() => $(modalCartRef.current).modal('hide')}>Check-Out</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">HomeStyle</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/blog" className="nav-link">Blog</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Store</div>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to="/store/category/bedroom" className="dropdown-item">Bedroom</Link>
                                <Link to="/store/category/bathroom" className="dropdown-item">Bathroom</Link>
                                <Link to="/store/category/living-room" className="dropdown-item">Living Room</Link>
                            </div>

                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0" onSubmit={(e) => e.preventDefault()}>
                        <div className="navbar-nav mx-2">
                            
                            <span type="button" className="fa-stack has-badge" style={{color: 'black'}} data-count={calculateSumQtyCart()} data-toggle="modal" data-target="#cartModal">
                                <i className="fa fa-shopping-cart fa-lg mt-1" style={{color: 'dodgerblue'}}></i>
                            </span>

                            <Link to="/favorites">
                                <span className="fa-stack has-badge mx-2" style={{color: 'black'}} data-count={favoriteProducts.length}>
                                    <i className="fa fa-heart mt-1 fa-lg" style={{color: 'dodgerblue'}}></i>
                                </span>
                            </Link>

                            {currentUser ? <div> Hello {currentUser.firstName}</div> : ''}

                            <div className="nav-item dropdown mx-2">
                                <div className="nav-link dropdown-toggle px-0 py-1" id="loginNavbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-lg fa-user" style={{color: 'dodgerblue'}}></i>
                                </div>
                                <div className="dropdown-menu" aria-labelledby="loginNavbarDropdown" style={{width: "170px"}}>
                                    { currentUser ?
                                        <div>
                                            <button type="button" className="btn btn-light"><Link to="/profile">Profile</Link></button>|
                                            <button type="button" className="btn btn-light" onClick={handleLogout}><Link to="#">Log out</Link></button>
                                        </div>
                                        :
                                        <div>
                                            <button type="button" className="btn btn-light"><Link to="/login">Login</Link></button>|
                                            <button type="button" className="btn btn-light"><Link to="/signup">Sign Up</Link></button>
                                        </div>
                                    }
                                    {(currentUser && currentUser.role === 'admin') ?
                                        <button type="button" className="btn btn-light"><Link to="/admin">Admin</Link></button>
                                    : ''
                                    }
                                </div>
                            </div>
                        </div>
                        <input className="form-control mr-sm-2" placeholder="Search" aria-label="Search" ref={searchInputRef} onChange={onSetSearchInput}></input >
                        <Link to={`/store?q=${searchInput}`} type="button" className="btn btn-outline-dark my-2 my-sm-0">Search</Link>
                    </form>
                </div>
            </nav>

            {setCartModal()}
        </>
    );
    
}



   
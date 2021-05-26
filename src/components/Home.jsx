import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import '../css/home.css';
import 'bootstrap/js/dist/carousel';
import { useStore } from '../context/StoreContext';
import axios from 'axios';


export default function Home() {
    const { products } = useStore();
    const [bestSellersProducts, setBestSellersProducts] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);

        axios.get(`${process.env.REACT_APP_PROXY}/products/?sort=["qtyOrdered", "desc"]`)
        .then(res => {
            setBestSellersProducts(res.data);
        })

    }, [])

    const bestSellersCarousel = () => {
        const cards = [];
        bestSellersProducts.slice(0, 6).forEach((item, index) => {
            cards.push(
                <div className={`col-md-4 ${index%3!==0? 'clearfix d-none d-md-block' : ''}`} key={index}>
                    <Link to={`/${item.name.replace(' ', '_')}`} className="bestSeller" style={{color: 'black', textDecoration: 'none'}}>
                        <div className="card">
                            <img className="card-img-top" src={`${item.product_images[0]}`} alt={item.name}></img>
                            <div className="card-body">
                                <h4 className="card-title">{item.name}</h4>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        });

        const sliders = [];
        for (let i=0; i<2; i++) {
            sliders.push(
                <div className={`carousel-item ${i===0? 'active' : ''}`} key={i}>
                    <div className="row">
                        {cards.slice(i*3, i*3+3)}
                    </div>
                </div>
            )
        }

        return (
            <div id="multi-item-example" className="container carousel slide carousel-multi-item" data-ride="carousel">
                {/* <!--Controls--> */}
                <div className="controls-top">
                    <a className="btn-floating" href="#multi-item-example" data-slide="prev"><i className="fa fa-chevron-left"></i></a>
                    <a className="btn-floating" href="#multi-item-example" data-slide="next"><i className="fa fa-chevron-right"></i></a>
                </div>
                {/* <!--Indicators--> */}
                <ol className="carousel-indicators">
                    <li data-target="#multi-item-example" data-slide-to="0" className="active"></li>
                    <li data-target="#multi-item-example" data-slide-to="1"></li>
                </ol>

                {/* <!--Slides--> */}
                <div className="carousel-inner" role="listbox">
                    {sliders}
                </div>
                {/* <!--/.Slides--> */}
            </div>
        )  
    }


    return (
        <div>
            <div className="container-fluid">
                <div className="d-flex flex-column align-items-center justify-content-center" id="major">
                    <h1 className="mb-4" style={{fontSize: "80px"}}>UP TO 30% OFF</h1>
                </div>
            </div>
            <div className="container-fluid py-4">
                <div className="row text-center categories">
                    <div className="col-12 col-md-4 my-2">
                        <Link to="/store/category/bedroom" style={{color: 'black', textDecoration: 'none'}}>
                            <div className="box" id="bedroom">
                                <h1 className="display-4 pt-3" style={{fontWeight: "400", fontSize: "40px"}}>BEDROOM</h1>
                            </div>
                        </Link>
                    </div>
                    
                    <div className="col-12 col-md-4 my-2">
                        <Link to="/store/category/bathroom" style={{color: 'black', textDecoration: 'none'}}>
                            <div className="box" id="bathroom">
                                <h1 className="display-4 pt-3" style={{fontWeight: "400", fontSize: "40px"}}>BATHROOM</h1>
                            </div>
                        </Link>
                    </div>
                    <div className="col-12 col-md-4 my-2">
                        <Link to="/store/category/living-room" style={{color: 'black', textDecoration: 'none'}}>
                            <div className="box" id="living_room">
                                <h1 className="display-4 pt-3" style={{fontWeight: "400", fontSize: "40px"}}>LIVING ROOM</h1>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center" id="sale">
                <div className="text-center">
                    <h1 style={{fontSize: "100px", color: "red"}}>Sale!</h1>
                    <h1 style={{fontSize: "100px", color: "red"}}>Up to 30%</h1>
                </div>
                <Link to="/store/sale" style={{color: 'white', textDecoration: 'none'}}>
                    <h1 className="display-3" style={{fontWeight: "400"}}>See Products</h1>
                </Link>
            </div>

            { bestSellersProducts ? 
                <div className="container-fluid text-center py-4">
                    <h1 className="display-4" style={{fontWeight: "350", fontSize: "50px", margin:"0"}}>Best Sellers</h1>
                    <div>
                        {bestSellersCarousel()}
                    </div>
                </div>
                : ''
            }
            

        </div>
    );
}


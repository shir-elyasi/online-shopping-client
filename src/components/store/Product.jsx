import React, { useEffect} from 'react';
import {Link} from 'react-router-dom';


export default function Product(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    },[])
    
    const displayPrice = () => {
        if(props.productElement.discount !== 0){
            return (<div>
                        <p className="card-text mx-0 my-0">{props.productElement.discount * 100}% OFF </p>
                        <p><del>${props.productElement.price}</del>&ensp; 
                            ${props.productElement.price * (1 - props.productElement.discount)}
                        </p>
                    </div>)
        }
        else{
            return <p>${props.productElement.price}</p>
        }
    }

    return (
        <div className="col-6 col-md-3 pb-2 pl-0">
            <Link to={`/${props.productElement.name.replace(' ', '_')}`} style={{ color: 'black', textDecoration: 'none' }}>
                <div className="card text-center" style={{height: '100%'}}>
                    <img className="card-img-top" src={props.productElement.product_images[0]} alt={props.productElement.name}></img>
                    <div className="card-body py-0 px-0">
                        <p className="card-title">{props.productElement.name}</p>
                        {displayPrice()}
                    </div>
                </div>
            </Link>
        </div>
    );
}


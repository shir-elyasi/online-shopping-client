import React, { useRef, useState, useEffect } from 'react';
import Product from './Product.jsx';
import axios from 'axios';


export default function Store(props) {
    const [ displayProducts, setDisplayProducts ] = useState([]);
    const [category, setCategory] = useState();
    const [ subcategories, setSubcategories ] = useState([]);
    const [ valuePriceSelect, setValuePriceSelect ] = useState(0);
    
    const priceRangeRef = useRef();
    const onSaleRef = useRef();
    const sortRef = useRef();

    useEffect(() => {
        window.scrollTo(0, 0);

        const path = props.location.pathname.split('/')

        uncheckAllCheckboxes(); 

        if (path.length === 4){
            const category = path[3];
            setCategory(category);

            axios.get(`${process.env.REACT_APP_PROXY}/products/?category=${category}`)
            .then(res => {
                setDisplayProducts(res.data);
            })

            axios.get(`${process.env.REACT_APP_PROXY}/categories/?category=${category}`)
            .then(res => {
                const subcategories = res.data.map(element => {
                    return {name: element.name, isChecked: false};
                });
                setSubcategories(subcategories);
            })

        }

        if (props.location.search) {
            axios.get(`${process.env.REACT_APP_PROXY}/products/${props.location.search}`)
            .then(res => {
                setDisplayProducts(res.data);
            })
        }

        if (path.length === 3 && path[2] === 'sale') {
            axios.get(`${process.env.REACT_APP_PROXY}/products/?onSale=true`)
            .then(res => {
                setDisplayProducts(res.data);
            })

            axios.get(`${process.env.REACT_APP_PROXY}/categories/?allSubCategories=true`)
            .then(res => {
                const subcategories = res.data.map(element => {
                    return {name: element.name, isChecked: false};
                });
                setSubcategories(subcategories);

                
            })
        }
        
    }, [props.location.pathname, props.location.search])

    const uncheckAllCheckboxes = () => {
        var inputs = document.querySelectorAll('.form-check-input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].checked = false;
        }
    }

    const setPriceValue = (event) => {
        setValuePriceSelect(event.target.value);
    }

    const changeSubcategory = (event) => {
        subcategories.forEach(subcategory => {
            if (subcategory.name === event.target.value)
                subcategory.isChecked = event.target.checked;
        })
    }

    const displayFilteredItems = () => {
        const sort = sortRef.current.value ? `sort=["price", "${sortRef.current.value}"]&` : `sort=["createdAt", "desc"]&`;
        const checkedSubcategories = subcategories.filter(element => element.isChecked).map(element => element.name);
        const subcategory = checkedSubcategories.length > 0 ? `subcategory=${checkedSubcategories.join(',')}&` : "";
        const categorySelected = category ? `category=${category}&` : "";
        const onSaleChecked = onSaleRef.current ? `onSale=${onSaleRef.current.checked}&` : '';
        
        axios.get(`${process.env.REACT_APP_PROXY}/products/?${categorySelected}${sort}${subcategory}${onSaleChecked}price=${valuePriceSelect}`)
        .then(res => {
            setDisplayProducts(res.data);
        })
    }

    return (
        <div className= "container py-5">
            <div className="row">
                { props.location.search ? 
                    <div className="col-3 pr-5">
                    </div>
                :
                    <div className="col-3 pr-5">
                        <h5>Sort</h5>
                        <div className="form-group mb-4">
                            <select className="form-control form-control-sm" ref={sortRef} onChange={displayFilteredItems}>
                                <option value="">Date</option>
                                <option value="asc">Price: low to high</option>
                                <option value="desc">Price: high to low</option>
                            </select>
                        </div>

                        <h5 className="mt-5">Filter</h5>

                        <h6 className="mt-3">Sub Category</h6>    
                        {subcategories.map((element, index) => (
                            <div className="form-check" key={index}>
                                <input className="form-check-input" type="checkbox" value={element.name} onChange={changeSubcategory}></input>
                                <label className="form-check-label" htmlFor={Object.keys(element.name)}>
                                    {element.name}
                                </label>
                            </div>
                        ))}

                        { props.location.onSale ? '' :
                            <div className="my-3">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="onSaleCheck" ref={onSaleRef}></input>
                                    <label className="form-check-label" htmlFor="onSaleCheck"><h6>On Sale</h6></label>
                                </div>
                            </div>
                        } 

                        <br></br>
                        <h6>Price</h6> 
                        <label htmlFor="priceRange" className="form-label"></label>
                        <input type="range" className="form-range" id="priceRange" min="0" max="1000" step="10" onInput={setPriceValue} ref={priceRangeRef}></input>
                        <output> {valuePriceSelect}</output>

                        <div className="mt-3">
                            <button className="btn btn-outline-primary btn-sm" type="button" onClick={displayFilteredItems}>Apply</button>
                            <button className="btn btn-outline-primary btn-sm mx-2" type="button" onClick={() => window.location.reload(false)}>Reset</button>
                        </div>
                        
                    </div>
                }

                    <div className="col-9 justify-content-center">
                        <div className="row">
                            {displayProducts.map(productElement =>
                                <Product key={productElement.id} productElement={productElement}/>)
                            }
                        </div>
                    </div>
                
            </div>
        </div>
    );
}

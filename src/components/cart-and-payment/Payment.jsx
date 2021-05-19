import React, { useRef, useState } from 'react';
import {Button, Collapse } from 'react-bootstrap';
import OrderSummary from './OrderSummary.jsx';
import 'bootstrap/js/dist/collapse';
import PayPalBtn from './PayPalBtn';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import {useHistory} from 'react-router-dom';
import { phonePattrern} from '../../data/constants';
import { RESET_CART } from '../../reducers/cart.actions'
import axios from 'axios';


export default function Payment() {
    const { cartState, cartDispatch, cancelCoupon, getSubTotalAmount, getTaxesAmount, getCouponDiscountAmount, getTotalBeforeDelivert, myCoupon } = useCart();
    const { currentUser, getAuthHeaders } = useAuth();
    const history = useHistory();

    const recipientDetails = useRef();
    const phoneRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const streetRef = useRef();
    const homeNumberRef = useRef();
    const apartmentNumberRef = useRef();
    const selectDelivery = useRef();
    const cityRef = useRef();
    
    const [openRecipientDetails, setOpenRecipientDetails] = useState(false);
    const [openPaymentDetails, setOpenPaymentDetails] = useState(false);
    const [deliveryAmount, setDeliveryAmount] = useState(0);
    const [messagePhone, setMessagePhone] = useState();
    const [messageFirstName, setMessageFirstName] = useState();
    const [messageLastName, setMessageLastName] = useState();
    const [messageStreet, setMessageStreet] = useState();
    const [messageHomeNumber, setMessageHomeNumber] = useState();
    const [messageCity, setMessageCity] = useState();

    const invalidMessages = 
        {
            required: "This field is required", 
            emailPattern: "Please provide a valid email",
            phonePattern: "Please provide a valid phone number"                           
        };


    const calculateDelivery = () => {
        let totalAmount = getSubTotalAmount();
        if (totalAmount < 50){
            return 50;
        }
        else if (totalAmount >= 50 && totalAmount < 125){
            return 75;
        }
        else if (totalAmount >= 125 && totalAmount < 200){
            return 100;
        }
        else{
            return 0;
        }
    }

    const onChangeDelivery = () => {
        switch (selectDelivery.current.value){
            case 'Self-pickup':
                setDeliveryAmount(0);
                break;
            case 'Postal-service':
                setDeliveryAmount(10);
                break;
            case 'Registered-mail':
                setDeliveryAmount(30);
                break;
            case 'emissary':
                const deliveryAmount = calculateDelivery();
                setDeliveryAmount(deliveryAmount);
                break;
            default:
                break;
        }
    }


    const getTotalAmountAfterDelivery = () => {
        return getTotalBeforeDelivert() + deliveryAmount;
    }

    const validateRecipientDetails = () => {
        let correctInputs = true;
        
        if (firstNameRef.current.validity.valueMissing){
            firstNameRef.current.style.borderColor = 'red';
            correctInputs = false;
            setMessageFirstName(invalidMessages.required);
        }
        else{
            setMessageFirstName('');
            firstNameRef.current.style.borderColor = 'green';
        }

        if (lastNameRef.current.validity.valueMissing){
            lastNameRef.current.style.borderColor = 'red';
            correctInputs = false;
            setMessageLastName(invalidMessages.required);
        }
        else{
            setMessageLastName('');
            lastNameRef.current.style.borderColor = 'green';
        }

        if (streetRef.current.validity.valueMissing){
            streetRef.current.style.borderColor = 'red';
            correctInputs = false;
            setMessageStreet(invalidMessages.required);
        }
        else{
            setMessageStreet('');
            streetRef.current.style.borderColor = 'green';
        }

        if (homeNumberRef.current.validity.valueMissing){
            homeNumberRef.current.style.borderColor = 'red';
            correctInputs = false;
            setMessageHomeNumber(invalidMessages.required);
        }
        else{
            setMessageHomeNumber('');
            homeNumberRef.current.style.borderColor = 'green';
        }

        if (cityRef.current.validity.valueMissing){
            cityRef.current.style.borderColor = 'red';
            correctInputs = false;
            setMessageCity(invalidMessages.required);
        }
        else{
            setMessageCity('');
            cityRef.current.style.borderColor = 'green';
        }

        if (phoneRef.current.validity.valueMissing) {
            phoneRef.current.style.borderColor = 'red';
            correctInputs = false;
            setMessagePhone(invalidMessages.required);
        }
        else if (!phoneRef.current.value.match(phonePattrern)){
            phoneRef.current.style.borderColor = 'red';
            correctInputs = false;
            setMessagePhone(invalidMessages.phonePattern);
        }
        else {
            setMessagePhone('');
            phoneRef.current.style.borderColor = 'green';
        }

        return correctInputs;
    }

    const submitRecipientDetails = (event) => {
        event.preventDefault();
        setOpenPaymentDetails(false);

        const inputsValidation = validateRecipientDetails();
        if (inputsValidation){
            setOpenRecipientDetails(false);
            setOpenPaymentDetails(true);
        }  
    }

    const paymentHandler = async (details, data) => {
        const userID = currentUser ? currentUser._id : 1;
        const couponDiscountAmount = myCoupon.code ? getCouponDiscountAmount() * -1 : 0;
        const couponCode = myCoupon.code ? myCoupon.code : 0;
        const emailUser = currentUser ? currentUser.email: null;

        const orderedProducts = cartState.data.map((product) => {
            return {
                productId: product.id,
                quantity: product.quantity
            }
        })

        orderedProducts.forEach(element => {
            axios.patch(`${process.env.REACT_APP_PROXY}/products/${element.productId}`, {
                qtyOrdered: element.quantity
            }, {headers: getAuthHeaders()})
        });

        const resp = await axios.post(`${process.env.REACT_APP_PROXY}/orders`, {
            // id: data.orderID,
            totalAmount: parseFloat(details.purchase_units[0].amount.value),
            subtotalAmount: getSubTotalAmount(),
            taxesAmount: getTaxesAmount(),
            couponDiscountAmount: couponDiscountAmount,
            couponCode: couponCode,
            deliveryAmount: deliveryAmount,
            deliveryMethod: selectDelivery.current.value,
            products: orderedProducts,
            userId: userID,
            email: emailUser,
            recipient: {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                city: cityRef.current.value,
                street: streetRef.current.value,
                homeNumber: homeNumberRef.current.value,
                apartmentNumber: apartmentNumberRef.current.value ? apartmentNumberRef.current.value : null,
                phone: phoneRef.current.value
            }
            // payer_details: {
            //     id: details.payer.payer_id,
            //     first_name: details.payer.name.given_name,
            //     last_name: details.payer.name.surname,
            //     email_address: details.payer.email_address,
            //     country_code: details.payer.address.country_code
            // }
        }, {headers: getAuthHeaders()});
        
        cartDispatch({type: RESET_CART});
        localStorage.removeItem('cartProducts');
        cancelCoupon();
        
        history.push('/order-confirmation', {order_id: resp.data.create_order._id});
    }

    const onPaymentDetailsClicked = () => {
        const recipientInputsValidation = validateRecipientDetails();
        if (!recipientInputsValidation) {
            setOpenRecipientDetails(true);
            return;
        }

        setOpenPaymentDetails(!openPaymentDetails);
    }

    const onRecipientDetailsCliked = () => {
        setOpenRecipientDetails(!openRecipientDetails)
        setOpenPaymentDetails(false);
    }

    return (
        <div className="container">
            <h3 className="text-center mb-4">Check-Out</h3>
            <div className="row">
                <div className="col-12 col-md-8 mb-5 paymentForm">

                        <div className="col-12 col-md-10 mt-4 border-bottom" style={{borderColor: '#d9d9d9'}}>
                            <Button className="btn btn-light btn-block text-left" type="button"
                              onClick={onRecipientDetailsCliked}
                              aria-controls="costumer-details-collapse"
                              aria-expanded={openRecipientDetails}
                            >
                                Recipient Details
                            </Button>
                            <Collapse in={openRecipientDetails}>
                                <div className="collapse mb-2" id="RecipientDetails"  ref={recipientDetails}>
                                    <form>
                                        <div className="form-group mt-2">
                                        
                                            <div className="form row form-group">
                                                <div className="col-12 col-md-6">
                                                    <label htmlFor="firstName">First name:</label>
                                                    <input type="text" className="form-control" ref={firstNameRef} defaultValue={currentUser && currentUser.firstName ? currentUser.firstName : ''} required></input>
                                                    <div className="invalidMassege text-danger">
                                                        {messageFirstName}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label htmlFor="lastName">Last name:</label>
                                                    <input type="text" className="form-control" ref={lastNameRef} defaultValue={currentUser && currentUser.lastName? currentUser.lastName : ''} required></input>
                                                    <div className="invalidMassege text-danger">
                                                        {messageLastName}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="form row form-group">
                                                <div className="col-12 col-md-6">
                                                    <label htmlFor="city">City:</label>
                                                    <input type="text" className="form-control" ref={cityRef} defaultValue={currentUser && currentUser.address && currentUser.address.city ? currentUser.address.city : ''} required></input>
                                                    <div className="invalidMassege text-danger">
                                                        {messageCity}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label htmlFor="street">Street:</label>
                                                    <input type="text" className="form-control" ref={streetRef} defaultValue={currentUser && currentUser.address && currentUser.address.street ? currentUser.address.street : ''} required></input>
                                                    <div className="invalidMassege text-danger">
                                                        {messageStreet}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="form row form-group">
                                                <div className="col-12 col-md-6">
                                                    <label htmlFor="apartmentNumber">Apartment number:</label>
                                                    <input type="number" className="form-control" ref={apartmentNumberRef} defaultValue={currentUser && currentUser.address && currentUser.address.appartmentNumber ? currentUser.address.appartmentNumber : ''} ></input>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label htmlFor="homeNumber">Home number:</label>
                                                    <input type="number" className="form-control" ref={homeNumberRef} defaultValue={currentUser && currentUser.address && currentUser.address.homeNumber ? currentUser.address.homeNumber : ''} required></input>
                                                    <div className="invalidMassege text-danger">
                                                        {messageHomeNumber}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form row form-group">
                                                <div className="col-12">
                                                    <label htmlFor="phone">Phone:</label>
                                                    <input type="tel" className="form-control" ref={phoneRef} placeholder="0501231234" defaultValue={currentUser && currentUser.phone ? currentUser.phone : ''} required></input>
                                                    <div className="invalidMassege text-danger">
                                                        {messagePhone}
                                                    </div>
                                                </div> 
                                            </div>
                                                                                        
                                            <button type="submit" className="btn btn-primary btn-sm px-5" onClick={submitRecipientDetails}>Next</button> 
                                        </div>  
                                    </form> 
                                </div>
                            </Collapse>
                        </div>

                        <div className="col-12 col-md-10 mt-4">
                            <div className="form-group">
                                <label htmlFor="deliverySelect">Delivery:</label>
                                <select className="form-control" ref={selectDelivery} onChange={onChangeDelivery}>
                                    <option value="Self-pickup">Self-pickup: $0</option>
                                    <option value="Postal-service">Postal service: $10</option>
                                    <option value="Registered-mail">Registered mail: $30</option>
                                    <option value="emissary">emissary: ${calculateDelivery().toLocaleString()} - Free over $200</option>
                                </select>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <div className="col-12 col-md-10 border-bottom" style={{borderColor: '#d9d9d9'}}>
                            <Button className="btn btn-light btn-block text-left" type="button" 
                              onClick={onPaymentDetailsClicked}
                              aria-controls="costumer-details-collapse"
                              aria-expanded={openPaymentDetails}
                            >
                                Payment Details
                            </Button>
                            <Collapse in={openPaymentDetails}>
                                <div className="mb-2 mt-3" id="paymentDetails">
                                    <form>
                                        <div className="form-group mt-2 payment-form">
                                            <div className="mb-2" id="paypalDetails">
                                                <PayPalBtn amount={0.1} currency={'USD'} onSuccess={paymentHandler}/>
                                            </div>
                                        </div>
                                    </form> 
                                </div>
                            </Collapse>
                        </div> 
                                            
                </div>
                <div className="col-12 col-md-4">
                    <OrderSummary />
                    <p>Delivery: ${deliveryAmount}</p>
                    <p><b>Total after delivery: <span className="text-success">${getTotalAmountAfterDelivery().toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></b></p>
                </div>
            </div>
        </div>
    )
}


import React, { useRef } from 'react';
import { useCart } from '../../context/CartContext';


export default function OrderSummary() {
    const { myCoupon, coupons, getSubTotalAmount, getTaxesAmount, getTotalAfterTaxes, getTotalBeforeDelivert, setMyCoupon } = useCart();

    const cuponInputRef = useRef();
    const cuponDiscountRef = useRef();
    const totalAmountRef = useRef();
    const amountAfterCuponRef = useRef();
    

    const onActivateCoupon = (e) => {
        e.preventDefault();
        
        if (cuponInputRef.current.value) {   
            let cuponConfirmed = false
            coupons.forEach(element => {
                if (element.code === cuponInputRef.current.value){
                    cuponConfirmed = true;
                    const coupon = {code: element.code, discount: element.discount}
                    setMyCoupon(coupon);
                    localStorage.setItem('myCoupon', JSON.stringify(coupon));
                    totalAmountRef.current.style.textDecorationLine = "line-through";
                }
            });
            if (!cuponConfirmed){
                alert("Coupon code is invalid")
            }
        }
    }

    const onCancelCoupon = (e) => {
        e.preventDefault();
        setMyCoupon({});
        localStorage.removeItem('myCoupon')
    }

        
    return (
        <>
            <h4 className="text-center border-bottom pb-2">Order Summary</h4>
            <p>Subtotal: ${(getSubTotalAmount()).toLocaleString()}</p>
            <p>Taxes: ${((getTaxesAmount()).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            <form>
                <div className="form-group">
                    <label htmlFor="cupon">Cupon-code:</label>
                    <input type="text" className="form-control d-inline" id="cuponInput" ref={cuponInputRef} defaultValue={myCoupon ? myCoupon.code : ''}></input>
                    <div className="mt-2">
                        <button type="submit" className="btn btn-outline-primary btn-sm d-inline mr-2" onClick={onActivateCoupon}>Activate coupon</button>
                        <button type="submit" className="btn btn-outline-primary btn-sm d-inline" onClick={onCancelCoupon}>Cancel coupon</button>
                    </div>
                </div>
            </form>

            {myCoupon.code ?
                <div className="text-success" ref={cuponDiscountRef}>
                    {myCoupon.discount * 100}% discount
                </div>
            : null
            }
            <p className="mt-1">
                <b>Total: </b> 
                <span className="text-success" style={myCoupon.code ? {textDecorationLine: 'line-through'} : {}} ref={totalAmountRef} >
                    ${getTotalAfterTaxes().toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
            </p>
            {myCoupon.code ?
                <p ref={amountAfterCuponRef}>
                    <b>Total after coupon discount: </b><span className="text-success">${getTotalBeforeDelivert().toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </p>
            : null
            }
                        
        </>
    )

}





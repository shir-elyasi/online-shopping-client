import React, { useRef, useState} from 'react';
import { emailPattern, phonePattrern } from '../data/constants'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";

export default function Contact() {

    const fullNameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const notesRef = useRef();

    const [messageFullName, setmessageFullName] = useState('')
    const [messagePhone, setMessagePhone] = useState('')
    const [messageEmail, setMessageEmail] = useState('')
    const [messageNotes, setMessageNotes] = useState('')


    const submitContact = (event) => {
        event.preventDefault();

        const invalidMessages= {required: "This field is required", 
                                emailPattern: "Please provide a valid email",
                                phonePattern: "Please provide a valid phone number"                           
                                };

        let correctInputs = true;

        if (fullNameRef.current.validity.valueMissing){
            fullNameRef.current.style.borderColor = 'red';
            correctInputs = false;
            setmessageFullName(invalidMessages.required);
        }
        else{
            setmessageFullName('');
            fullNameRef.current.style.borderColor = 'green';
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
        
        if (!emailRef.current.value){
            emailRef.current.style.borderColor = 'red';
            correctInputs = false;
            setMessageEmail(invalidMessages.required);
        } 
        else if (!emailRef.current.value.match(emailPattern)){
            emailRef.current.style.borderColor = 'red';
            correctInputs = false;
            setMessageEmail(invalidMessages.emailPattern);
        }
        else {
            setMessageEmail('');
            emailRef.current.style.borderColor = 'green';
        }

        if (notesRef.current.validity.valueMissing){
            notesRef.current.style.borderColor = 'red';
            correctInputs = false;
            setMessageNotes(invalidMessages.required);
        }
        else{
            setMessageNotes('');
            notesRef.current.style.borderColor = 'green';
        }
    
        if (correctInputs) {

        }
        else {
            
        }
    }

    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 32.07458, lng: 34.79219 }}
        >
            <Marker
                position={{ lat: 32.07458, lng: 34.79219 }}
            >
                <InfoWindow>
                    <div>Derech Menachem Begin 132, Tel Aviv-Yafo</div>
                </InfoWindow>
            </Marker>
        </GoogleMap>
    ));

    return(
        <>
        <div className="container my-4">
            <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBN0_UWUyYf1lDEB-x_XVixTMHhAhEEtA0&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                />
        </div>

        <div className="container-fluid mt-4 py-5" style={{backgroundColor: "#f2f2f2"}}>
            <div className="container">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h3>Contact Us</h3>
                    <div style={{minWidth:"700px"}}>
                        <form>
                            <label htmlFor="fullName">Full name: </label>
                            <input type="text" className="form-control" ref={fullNameRef} required></input>
                            <div className="invalidMassege text-danger">
                                {messageFullName}
                            </div>

                            <label htmlFor="phone">Phone: </label>
                            <input type="tel" className="form-control" ref={phoneRef} placeholder="050-123-1234" required></input>
                            <div className="invalidMassege text-danger">
                                {messagePhone}
                            </div>
                            
                            <label htmlFor="email">Email: </label>
                            <input type="mail" className="form-control" ref={emailRef} required></input>
                            <div className="invalidMassege text-danger">
                                {messageEmail}
                            </div>

                            <label for="notes">Comment: </label>
                            <textarea className="form-control" ref={notesRef} rows="3" required></textarea>
                            <div className="invalidMassege text-danger">
                                {messageNotes}
                            </div>

                            <div className="d-flex justify-content-center mt-3">
                            <button type="submit" className="btn btn-primary align-middle" onClick={submitContact}>Submit</button>
                            </div>
                            
                        </form>
                    </div>
                </div> 
            </div>
        </div>
        </>
    ) 
}


import React, { useRef, useState } from 'react'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';



export default function SignUp() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading]= useState(false);
    const history = useHistory();
  
    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }

        try{
            setError('')
            setLoading(true)

            await axios.post(`${process.env.REACT_APP_PROXY}/users/signup`, {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
            const respLogin = await axios.post(`${process.env.REACT_APP_PROXY}/users/login`, {
                email: emailRef.current.value,
                password: passwordRef.current.value,

            })

            localStorage.setItem("token", respLogin.data.token);
            history.push("/")
        } 
        catch(err) {
            console.log(err);
            setError('Failed to create an account')
        }
        finally {
            setLoading(false)
        }   
    }

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center" style={{minHeight: "80vh"}}>
                <div className="w-100" style={{maxWidth: "400px"}}>
                    <Card className="px-3">
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign Up</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="firstName">
                                    <Form.Control type="text" placeholder="First name" ref={firstNameRef} required></Form.Control>
                                </Form.Group>

                                <Form.Group id="lastName">
                                    <Form.Control type="text" placeholder="Last name" ref={lastNameRef} required></Form.Control>
                                </Form.Group>

                                <Form.Group id="email">
                                    <Form.Control type="email" placeholder="Email" ref={emailRef} required></Form.Control>
                                </Form.Group>

                                {/* <Form.Group id="phone">
                                    <Form.Control type="tel" placeholder="Phone" ref={phoneRef} required></Form.Control>
                                </Form.Group> */}

                                <Form.Group id="password">
                                    <Form.Control type="password" placeholder="Password" ref={passwordRef} required></Form.Control>
                                </Form.Group>

                                <Form.Group id="password-confirm">
                                    <Form.Control type="password" placeholder="Password Confirmation" ref={passwordConfirmRef} required></Form.Control>
                                </Form.Group>

                                <Button disabled={loading} className="w-100 mt-3" type="submit">Sign Up</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </div>
            </Container>
        </>
    )
}


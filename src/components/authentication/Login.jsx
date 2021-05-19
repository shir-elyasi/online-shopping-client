import React, { useRef, useState } from 'react'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import GoogleLogin from 'react-google-login'
import axios from 'axios';


export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setCurrentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading]= useState(false);
    const history = useHistory();

    //login with google/facebook
    // const uiConfig = {
    //     signInFlow: "popup",
    //     signInOptions: signInOptions,
    //     callbacks: { signInSuccess: () => history.push("") }
    // }

  
    async function handleLogin(e) {
        e.preventDefault()

        try{
            setError('')
            setLoading(true)

            const resp = await axios.post(`${process.env.REACT_APP_PROXY}/users/login`, {
                email: emailRef.current.value,
                password: passwordRef.current.value
            })

            localStorage.setItem("token", resp.data.token);
            setCurrentUser(resp.data.user)
            localStorage.setItem("userId", resp.data.user._id);
            history.push("/")

        } catch(err) {
            console.log(err);
            setError('Failed to log in')
        }
        setLoading(false)
    }

    const handleLoginGoogle = async (resp) => {
        try {
            const googledata = await axios.post(`${process.env.REACT_APP_PROXY}/users/loginGoogle`, { tokenGoogle: resp.tokenId })
            localStorage.setItem("token", googledata.data.token);
            setCurrentUser(googledata.data.user)
            history.push("/")
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center py-5" style={{minHeight: "80vh"}}>
                <div className="w-100" style={{maxWidth: "400px"}}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Log In</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleLogin}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required></Form.Control>
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required></Form.Control>
                                </Form.Group>
                                <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                            </Form>

                            <div className="text-center mt-4">
                                <GoogleLogin
                                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                    buttonText="Log in with Google"
                                    onSuccess={handleLoginGoogle}
                                    onFailure={handleLoginGoogle}
                                    cookiePolicy={'single_host_origin'}
                                ></GoogleLogin>
                            </div>
                            

                            <div className="w-100 text-center mt-3">
                                <Link to="/forgot-password">Forgot Password?</Link>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </Container>
        </>
    )
}


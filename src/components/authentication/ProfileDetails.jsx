import React, {useState, useRef } from 'react'
import {Container, Card, Button, Alert, Form, Col, Row} from 'react-bootstrap'
import {useAuth} from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function ProfileDetails() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { currentUser, getAuthHeaders } = useAuth();
    const [loading, setLoading]= useState(false);

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        try {
            await axios.patch(`${process.env.REACT_APP_PROXY}/users/details/${currentUser._id}`, {
                email: emailRef.current.value,
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                phone: phoneRef.current.value,
            },
            {headers: getAuthHeaders()})

            setSuccess('Details updated successfully')
        }
        catch(err) {
            console.log(err);
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }
    
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center py-5">
                <div className="w-100" style={{maxWidth: "600px"}}>
                    <Card>
                        <Card.Header>
                            <Card.Title>Profile</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">The information can be edited</Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col>
                                        <Form.Group id="firstName">
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control type="text" ref={firstNameRef} defaultValue={currentUser ? currentUser.firstName : ''}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group id="lastName">
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control type="text" ref={lastNameRef} defaultValue={currentUser ? currentUser.lastName : ''}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group id="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" ref={emailRef} defaultValue={currentUser ? currentUser.email : ''} ></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group id="phone">
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control type="tel" ref={phoneRef} defaultValue={(currentUser && currentUser.phone) ? currentUser.phone : ''}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col>
                                        <Form.Group id="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" ref={passwordRef} ></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row> */}
                                <Button disabled={loading} className="w-100" type="submit">SAVE CHANGES</Button>
                            </Form>
                            <div className="w-100 text-center mt-2">
                                <Link to="/change-password">Change Password</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )
}

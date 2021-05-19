import React from 'react';
import {Link} from 'react-router-dom';
import {Card} from "react-bootstrap";


export default function Footer() {
    return (
        <Card className="text-center myfooter">
            <Card.Body>
                <div className="socialmedia-links">
                    <a href="https://www.facebook.com/"><i className="fab fa-facebook"></i></a>
                    <a href="https://www.instagram.com/"><i className="fab fa-instagram-square"></i></a>
                    <a href="https://twitter.com/"><i className="fab fa-twitter-square"></i></a>
                </div>
                <div className="footer-info mt-1">
                    <Link to="/contact">Contact Us</Link>
                </div>
                <p  className="text-muted mt-1">© 2021 Copyright HomeStyle</p>
            </Card.Body>
        </Card>
    );
}

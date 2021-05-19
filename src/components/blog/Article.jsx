import React from 'react';
import {Link} from 'react-router-dom';


export default function Article(props) {
    const articleDate = new Date(props.post.createdate);
    
    return (
        <Link to={`/posts/${props.post._id}`} style={{ color: 'black', textDecoration: 'none' }}>
            <div className="row border py-2 mb-4">
                <div className="col-6 col-md-10">
                    <div className="d-flex flex-column justify-content-between">
                        <div>
                            <h5>{props.post.title}</h5>
                            <p>{props.post.brief}</p>
                        </div>
                        <div className="text-muted">
                            <p >Author: {props.post.author[0].firstName + ' ' + props.post.author[0].lastName}</p>
                        </div>
                        <div className="text-muted">
                            <p>Date:{articleDate.toLocaleDateString("en-US")}</p>
                        </div>
                    </div>
                </div>
                    
            </div>
        </Link>
    );
}

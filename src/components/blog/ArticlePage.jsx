import React, { useRef, useState, useEffect } from 'react';
import ArticleComment from './ArticleComment';
import {useAuth} from '../../context/AuthContext';

import axios from 'axios';



export default function ArticlePage(props) {
    const titleRef = useRef();
    const notesRef = useRef();
    
    const [messageNotes, setMessageNotes] = useState();
    const [comments, setComments] = useState();
    const [alertComment, setAlertComment] = useState();
    
    const { currentUser, getAuthHeaders } = useAuth();


    useEffect(() => {
        window.scrollTo(0, 0);

        axios.get(`${process.env.REACT_APP_PROXY}/posts/${props.post._id}`)
        .then(res => {
            setComments(res.data[0].comments);
        })

    }, [props.post])

    function createArticleBody(){
        let articleBody = []
        let paragraphs = props.post.body.split('\n');
        // let imgURL = props.article.img;

        for(let i = 0; i < paragraphs.length; i++) {
            // if(i === Math.floor(paragraphs.length / 2)){
            //     articleBody.push(<div className="text-center my-5" key='image'><img src={imgURL} alt="articleBody"></img></div>)
            // }
            articleBody.push(<p key={i}>{paragraphs[i]}</p>);
        }
        
        return articleBody;
    }

    const submitContact = async (event) => {
        event.preventDefault();

        const invalidMessages= {required: "This field is required", 
                                emailPattern: "Please provide a valid email",
                                phonePattern: "Please provide a valid phone number"                           
                                };
        let correctInputs = true;

        if (titleRef.current.validity.valueMissing){
            notesRef.current.style.borderColor = 'red';
            correctInputs = false;
            setMessageNotes(invalidMessages.required);
        }
        else{
            setMessageNotes('');
            notesRef.current.style.borderColor = 'green';
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
            try {
                await axios.post(`${process.env.REACT_APP_PROXY}/posts/${props.post._id}`, {
                    userId: currentUser._id,
                    title: titleRef.current.value,
                    body: notesRef.current.value
                },  {headers: getAuthHeaders()})

                setAlertComment('success')
            }
            catch(err) {
                console.log(err)
            }

        }
    }

    return (
        <div className="articlePage">
            <div className="container text-justify py-5">
                <h1 className="display-4 mb-5 mt-3">{props.post.title}</h1>
                {createArticleBody()}
            </div>

            <div className="container-fluid d-flex justify-content-center" style={{backgroundColor: "#f2f2f2"}}>
                <div className="container">
                        <h4 className="text-center pt-4">Comments</h4>
                        {comments ?
                            comments.map((comment, index) => 
                                <ArticleComment
                                    comment={comment}
                                    key={index}
                                ></ArticleComment>
                            )
                        : null
                        }
                </div>
            </div>
            
            { currentUser &&
                <div className="container-fluid mt-4 py-5 d-flex justify-content-center" style={{backgroundColor: "#f2f2f2"}}>
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{width: "800px"}}>
                        <h4>Leave a comment</h4>
                        <form style={{width: "80%"}}>
                            {/* <label htmlFor="fullName">Full name: </label>
                            <input type="text" className="form-control" ref={fullNameRef} required></input>
                            <div className="invalidMassege text-danger">
                                {messageFullName}
                            </div>

                            <label htmlFor="email">Email: </label>
                            <input type="mail" className="form-control" ref={emailRef} required></input>
                            <div className="invalidMassege text-danger">
                                {messageEmail}
                            </div> */}

                            <label htmlFor="notes">Title: </label>
                            <textarea className="form-control" ref={titleRef} rows="3" required></textarea>
                            <div className="invalidMassege text-danger">
                                {messageNotes}
                            </div>

                            <label htmlFor="notes">Comment: </label>
                            <textarea className="form-control" ref={notesRef} rows="3" required></textarea>
                            <div className="invalidMassege text-danger">
                                {messageNotes}
                            </div>

                            <div className="d-flex flex-column justify-content-center mt-3">
                            {
                                alertComment && alertComment === 'success' ? 
                                <div class="alert alert-success" role="alert">
                                    Your response has been recorded 
                                </div>
                                : ''
                            }
                            <button type="submit" className="btn btn-primary align-middle" onClick={submitContact}>Submit</button>
                            </div>
                        </form>
                    </div> 
                </div>
            }
            

        </div>
    );
}

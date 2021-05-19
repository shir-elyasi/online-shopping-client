import React from 'react';
import Article from './Article';
import { useBlog } from '../../context/BlogContext';


export default function Blog() {

    const { posts } = useBlog();


    return (
        <div>
            <div className="container-fluid">
                <div className="d-flex flex-column align-items-center justify-content-center" id="blog">
                    <h1 className="mb-4">Blog</h1>
                </div>
            </div>
            
            <div className="d-flex flex-column align-items-center justify-content-center my-5" id="articles">
                <div className="container-lg py-3" id="container-articles">
                    
                    {posts ? 
                        posts.map(post => 
                            <Article key={post._id} post={post}/>
                        )
                    : null
                    }

                </div>
            </div>
        </div>
    );
}

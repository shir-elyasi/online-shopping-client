import React, { useContext, useState, useEffect} from 'react';
import axios from 'axios';

const BlogContext = React.createContext();

export function useBlog() {
    return useContext(BlogContext)
}

export function BlogProvider({children}) {
    const [posts, setPosts] = useState([]);

    useEffect(() => { 
        axios.get(`${process.env.REACT_APP_PROXY}/posts`)
        .then(res => {
            setPosts(res.data);
        })
    }, [])

    const value = {
        posts,
        setPosts
    }

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
}

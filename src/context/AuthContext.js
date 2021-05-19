import React, { useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const history = useHistory();

    useEffect( () => {
        const userId = localStorage.getItem('userId')
        if (userId) {
            axios.get(`${process.env.REACT_APP_PROXY}/users/${userId}`, {}, {headers: getAuthHeaders()})
            .then(res => {
                setCurrentUser(res.data)
            })
        }
    },[])
    
    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {'Content-Type': 'application/json', 'Authorization': token ? `Bearer ${token}` : ""};
    }

    function logout() {
        setCurrentUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        history.push('/')
    }

    const value = {
        currentUser,
        setCurrentUser,
        logout,
        getAuthHeaders
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

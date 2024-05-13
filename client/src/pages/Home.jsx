// eslint-disable react/jsx-filename-case
import { useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";

const Home = () => {
    const [username, setUsername] = useState('');
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            // Decode token
            const decodedToken = jwtDecode(token);

            // Check if user data exists
            if (decodedToken && decodedToken.user) {
                setUsername(decodedToken.user.username);
            }
        }
        return () => {
            // Clear the username when the component unmounts
            setUsername('');
        };
    },[token]);

    return (
        <div>
            <h2>Welcome{username && `, ${username}`}!</h2>
            <p>This is the home page</p>
        </div>
    );
};

export default Home;

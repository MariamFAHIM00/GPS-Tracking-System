import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyEmail = () => {
    const navigate = useNavigate();
    useEffect(()  => {
        async function verifyEmail() {
            // Get the URLSearchParams object from the current URL
            const params = new URLSearchParams(window.location.search);

            // Get the value of the 'emailToken' parameter
            const emailToken = params.get('emailToken');
            try {
                const response = await axios.post(`http://localhost:5000/api/auth/verifyEmail/${emailToken}`);
                console.log("🚀 ~ useEffect ~ response:", response.data)

                const { token } = response.data;
                console.log("🚀 ~ useEffect ~ token:", token)
                if (token) {
                    localStorage.setItem('token', token);
                    navigate("/");
                    window.location.reload();
                }
            } catch (error) {
                toast.error(error.response.data.error)
            }
        }

        verifyEmail();
    });

    return null; // or render a loading indicator
}

export default VerifyEmail;

import React, { useState } from 'react';
import { sendPost, sendGet } from '../services/RequestSender';
import Alert from '../components/Alert';
import { Link, useNavigate  } from 'react-router-dom';
import { useUser } from '../services/UserContext';
import {jwtDecode} from 'jwt-decode';

const Login = () => {

    // define variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const { saveUser } = useUser();
    const navigate = useNavigate();

    const handleLogin = async () => {

        try {
            setLoading(true); // set loading state to true when the request starts (put Login in...)

            // prepare the request body
            const body = {username: username, password: password};

            // send post request and check if user exist
            const response = await sendPost('/tokens', '', {}, body, {});

            if (response.status === 200) {
                // extract the user data
                const token = response.data.token;
                const userId = jwtDecode(token).user_id;
                const userDetailsRes = await sendGet(`/users/${userId}`, token, {}, {});
                saveUser(userDetailsRes.data, token); // save the user

                // navigate to home page
                navigate('/');
            } else {
                // if the user not exist
                const errorMessage = response.data.error || 'Invalid credentials';
                setError(errorMessage);
                setShowAlert(true); // Trigger the alert to show the error message
            }
        } catch (err) {
            // if there was an error catch it and show the alert
            setError(err.response?.data?.error || 'An unexpected error occurred');
            setShowAlert(true);
        } finally {
            setLoading(false); // Stop loading
        }
    }

    // if the user press enter it will trigger the login
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div>
            {/* display the page title */}
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', paddingTop: '30px' }}>
                <p className="title-2 m-4">Login to your Nakniki-Account</p>
            </div>

            {/* display the username, password title and input */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                margin: '0 auto',
                maxWidth: '330px',
                marginTop: '20px'
            }}>
                <div style={{ marginBottom: '40px' }}>
                    <p className="paragraph" style={{ marginBottom: '5px' }}>Username:</p>
                    <input
                        className="form-control text-input"
                        type="username"
                        style={{ width: '150%' }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '40px' }}>
                    <p className="paragraph" style={{ marginBottom: '5px' }}>Password:</p>
                    <input
                        className="form-control text-input"
                        type="password"
                        style={{ width: '150%' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                {/* If the user doesn't have an account, let them move to the signup page */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0',
                    padding: '0',
                    width: '100%'
                }}>
                    <p className="paragraph" style={{
                        fontSize: '14px',
                        display: 'inline',
                        margin: '0',
                        textAlign: 'center'
                    }}>
                        Don't have an account?
                        <Link to={"/signup"} className="link" style={{
                            fontSize: '14px',
                            margin: '0 4px',
                        }}>
                            SignUp
                        </Link>
                        for infinite joy!
                    </p>
                </div>
            </div>

            {/* Display the Login button */}
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', paddingTop: '30px' }}>
                <button onClick={handleLogin} className="btn-main" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </div>

            {/* if there was an error put alert on the screen */}
            {showAlert && error && <Alert message={error} type="error" onClose={() => {setShowAlert(false)}}/>}
        </div>
    );
}

export default Login;

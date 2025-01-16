import React, { useState } from 'react';
import { sendPost } from '../services/RequestSender';
import Alert from './Alert'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            setLoading(true); // Set loading state to true when the request starts

            // Prepare the request body (using URLSearchParams to format as x-www-form-urlencoded)
            const body = "username=" + username + "&password=" + password;

            // Send POST request to the login endpoint
            const response = await sendPost('/tokens', '', {}, body);

            if (response.status === 200) {
                // Handle successful login
                setError('Good');

                // TODO redirect to home page
            } else {
                // Handle error response from server
                const errorMessage = response.data.error || 'Invalid credentials';
                setError(errorMessage);
            }
        } catch (err) {
            // Handle any errors that occur during the request
            setError(err.response.data.error);
        } finally {
            setLoading(false); // Stop loading
        }
    }

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
                {/* handle username */}
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
                {/* handle password */}
                <div style={{ marginBottom: '40px' }}>
                    <p className="paragraph" style={{ marginBottom: '5px' }}>Password:</p>
                    <input
                        className="form-control text-input"
                        type="password"
                        style={{ width: '150%' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {/* if the user doesn't have an account, let them move to signup page */}
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
                        <span className="link" style={{
                            fontSize: '14px',
                            margin: '0 4px',
                        }}>
                            SignUp {/* TODO direct the link */}
                        </span>
                        for infinite joy!
                    </p>
                </div>
            </div>
            {/* display the Login btn */}
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', paddingTop: '30px' }}>
                <button onClick={handleLogin} className="btn-main" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </div>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </div>
    );
}

export default Login;

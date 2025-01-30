import React, { useState } from 'react';
import AvatarCircle from '../components/AvatarCircle';
import { sendPost } from '../services/RequestSender';
import Alert from "../components/Alert";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

    // define variables
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            setLoading(true); // set loading state to true when the request starts

            // if the user didn't choose an avatar
            if (selectedAvatar == null) {
                const errorMessage = 'Please choose an avatar';
                setError(errorMessage);
                setShowAlert(true);
                return;
            }

            // if the password and the verify password are not the same
            if (password !== verifyPassword) {
                const errorMessage = 'Password and verify password must be the same.';
                setError(errorMessage);
                setShowAlert(true);
                return;
            }

            // prepare the request body
            const body = {
                username: username,
                password: password,
                email: email,
                profile_pic: selectedAvatar,
            };

            // send post request and check if user created
            const response = await sendPost('/users', '', {}, body);

            if (response.status === 201) {
                // if the user created
                setError('Created');
                setShowAlert(true);

                // navigate to log in
                navigate('/login');
            } else {
                // if the user not created properly
                const errorMessage = response.data.errors || 'Invalid credentials';
                setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage); // Handle multiple errors
                setShowAlert(true); // Trigger the alert to show the error message
            }
        }
        catch (err) {
            // if there was an error catch it and show the alert
            const errorMessage = err.response?.data?.errors || 'An unexpected error occurred';
            setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
            setShowAlert(true);
        }
        finally {
            setLoading(false); // Stop loading
        }
    }

    // Get all the avatars
    const avatarList = Array.from({ length: 11 }, (_, i) => `/avatars/avatar${i + 1}.png`);

    // when the user choose avatar set the state
    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar);
    };

    // if the user press enter it will trigger the signup
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSignup();
        }
    };

    return (
        <div>
            {/* Display the page title */}
            <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center', paddingTop: '30px'}}>
                <p className="title-2 m-4">Create new Nakniki-Account</p>
            </div>

            {/* Avatar Selection Section */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                margin: '0 auto',
                maxWidth: '330px',
                marginTop: '20px'
            }}>
                <p className="paragraph">Select a Profile Picture:</p>

                {/* Avatar List (Horizontal Scroll) */}
                <div
                    style={{
                        display: 'flex',
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                        gap: '10px',
                        padding: '10px',
                        maxWidth: '100%',
                    }}
                >
                    {avatarList.map((avatar, index) => (
                        <div
                            key={index}
                            onClick={() => handleAvatarSelect(avatar)}
                            style={{
                                display: 'inline-block',
                                padding: '5px',
                                border: selectedAvatar === avatar ? '2px solid red' : '2px solid transparent',
                                borderRadius: '50%',
                                cursor: 'pointer',
                            }}
                        >
                            <AvatarCircle src={avatar} radius="60px"/>
                        </div>
                    ))}
                </div>
            </div>
            {/* finish to take care of the avatar */}

            {/* take care of the username, password, verify password and email */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                margin: '0 auto',
                maxWidth: '330px',
                marginTop: '20px'
            }}>
                <div style={{marginBottom: '10px'}}> {/* username */}
                    <p className="paragraph" style={{marginBottom: '5px'}}>Username:</p>
                    <input
                        className="form-control text-input"
                        type="username"
                        style={{width: '150%'}}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div style={{marginBottom: '10px'}}> {/* email */}
                    <p className="paragraph" style={{marginBottom: '5px'}}>Email:</p>
                    <input
                        className="form-control text-input"
                        type="email"
                        style={{width: '150%'}}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div style={{marginBottom: '10px'}}> {/* password */}
                    <p className="paragraph" style={{marginBottom: '3px'}}>Password:</p>
                    <p className="paragraph fst-italic" style={{marginBottom: '5px', fontSize: '10px'}}>
                        Password must contain at least 6 characters and contain at least ont capital letter,
                        one number and special character.
                    </p>
                    <input
                        className="form-control text-input"
                        type="password"
                        style={{width: '100%'}}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div style={{marginBottom: '10px'}}> {/* verify password */}
                    <p className="paragraph" style={{marginBottom: '5px'}}>Verify Password:</p>
                    <input
                        className="form-control text-input"
                        type="password"
                        style={{width: '150%'}}
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                {/* If the user already has an account, let them move to the login page */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0',
                    padding: '0',
                    width: '100%'
                }}>
                    <p className="paragraph" style={{
                        fontSize: '14px',
                        margin: '0',
                        textAlign: 'center'
                    }}>
                        Already have an account?
                    </p>
                    <p className="paragraph" style={{
                        fontSize: '14px',
                        margin: '0',
                        textAlign: 'center'
                    }}>
                    <Link to={"/login"} className="link" style={{
                        fontSize: '14px',
                        margin: '0 4px',
                    }}>
                        Login
                    </Link>
                        to the key to your happiness.
                    </p>
                </div>

                {/* Display the Signup button */}
                <div style={{display: 'flex', justifyContent: 'center',width: '100%', textAlign: 'center', paddingTop: '30px'}}>
                    <button onClick={handleSignup} className="btn-main" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>
                </div>

                {/* add a spacer div */}
                <div style={{ height: '100px' }}></div>

                {/* if there was an error put alert on the screen */}
                {showAlert && error && <Alert message={error} type="error" onClose={() => {setShowAlert(false)}}/>}
            </div>
        </div>
    );
};

export default Signup;

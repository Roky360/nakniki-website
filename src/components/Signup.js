import React, { useState } from 'react';
import AvatarCircle from './AvatarCircle';

const Signup = () => {

    // define variables
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [email, setEmail] = useState('');

    // Get all the avatars
    const avatarList = Array.from({ length: 11 }, (_, i) => `/avatars/avatar${i + 1}.png`);

    // apply the chosen avatar
    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar);
    };

    return (
        <div>
            {/* Display the page title */}
            <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center', paddingTop: '30px'}}>
                <p className="title-2 m-4">Create Nakniki-Account</p>
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
                    <p className= "paragraph" style={{marginBottom: '5px', fontSize: '10px'}}>
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
                    <span className="link" style={{
                        fontSize: '14px',
                        margin: '0 4px',
                    }}>
                        Login {/* TODO put directed link to the page */}
                    </span>
                        to the key to your happiness.
                    </p>
                </div>

                {/* Display the Login button */}
            </div>
        </div>
    );
};

export default Signup;

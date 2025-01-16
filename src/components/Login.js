import React, { useState } from 'react';
import { sendPost } from '../services/RequestSender';

const Login = () => {

    return (
        <div>
            {/* display the page title */}
            <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center', paddingTop: '30px'}}>
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
                <div style={{marginBottom: '40px'}}>
                    <p className="paragraph" style={{marginBottom: '5px'}}>Username:</p>
                    <input className="form-control text-input" type="username" style={{width: '150%'}}/>
                </div>
                {/* handle password */}
                <div style={{marginBottom: '40px'}}>
                    <p className="paragraph" style={{marginBottom: '5px'}}>Password:</p>
                    <input className="form-control text-input" type="password" style={{width: '150%'}}/>
                </div>
                {/* if the user doesnt has an account let him move to page signup */}
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
                        SignUp
                    </span>
                        for infinite joy!
                    </p>
                </div>
            </div>
            {/* display the Login btn */}
            <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center', paddingTop: '30px'}}>
                <p className="btn-main">Login</p>
            </div>
        </div>
    );
}

export default Login;
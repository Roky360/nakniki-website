import React, { useState } from 'react';
import DefaultPopup from '../components/DefaultPopup';

function TestScreen() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        console.log('Form submitted:', formData);
    };

    return (
        <div className="App">
            <h1>Popup Form Example</h1>
            <DefaultPopup
                triggerElement={<button className="btn-main">Open Form</button>}
                content={
                    <div className="popup-container">
                        <div className="popup-header">
                            <h2>Login</h2>
                        </div>
                        <form className="popup-form" onSubmit={handleSubmit}>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Enter your username"
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                required
                            />
                            <button type="submit" className="btn-main">
                                Submit
                            </button>
                        </form>
                        {isSubmitted && (
                            <p className="submission-success">
                                Form submitted successfully!
                            </p>
                        )}
                    </div>
                }
                modal
            />
        </div>
    );
}

export default TestScreen;
